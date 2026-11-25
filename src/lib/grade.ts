import type { CodeQ, ExamQuestion, Mcq, VerdictQ } from "@/data/types";

export type GradeItem = {
  id: string;
  label: string;
  pass: boolean;
  points: number;
  max: number;
  detail?: string;
  overridable?: boolean;
};

export type GradeDetail = {
  score: number;
  max: number;
  items: GradeItem[];
};

export function normalizeSql(input: string): string {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/--[^\n]*/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function questionMax(q: ExamQuestion): number {
  if (q.kind === "mcq") return q.points;
  if (q.kind === "code") return q.checks.reduce((sum, check) => sum + check.points, 0);
  return q.items.reduce((sum, item) => sum + item.points, 0);
}

function applyOverride(item: GradeItem, overrides: Record<string, boolean>): GradeItem {
  if (!item.overridable || !(item.id in overrides)) return item;
  const pass = overrides[item.id];
  return {
    ...item,
    pass,
    points: pass ? item.max : 0,
  };
}

export function gradeQuestion(
  q: ExamQuestion,
  raw: string | undefined,
  overrides: Record<string, boolean> = {},
): GradeDetail {
  if (q.kind === "mcq") return gradeMcq(q, raw);
  if (q.kind === "code") return gradeCode(q, raw, overrides);
  return gradeVerdict(q, raw);
}

function gradeMcq(q: Mcq, raw: string | undefined): GradeDetail {
  const pass = raw === q.answer;
  return {
    score: pass ? q.points : 0,
    max: q.points,
    items: [
      {
        id: q.id,
        label: pass ? "Bonne réponse" : "Réponse incorrecte",
        pass,
        points: pass ? q.points : 0,
        max: q.points,
      },
    ],
  };
}

function gradeCode(q: CodeQ, raw: string | undefined, overrides: Record<string, boolean>): GradeDetail {
  const text = normalizeSql(raw ?? "");
  const items = q.checks.map((check) => {
    const key = `${q.id}:${check.id}`;
    const matched = text.length > 0 && check.match.test(text) && !(check.forbid?.test(text) ?? false);
    const base: GradeItem = {
      id: key,
      label: check.label,
      pass: matched,
      points: matched ? check.points : 0,
      max: check.points,
      overridable: true,
    };
    return applyOverride(base, overrides);
  });
  return {
    score: items.reduce((sum, item) => sum + item.points, 0),
    max: items.reduce((sum, item) => sum + item.max, 0),
    items,
  };
}

function gradeVerdict(q: VerdictQ, raw: string | undefined): GradeDetail {
  let parsed: Record<string, { verdict?: string }> = {};
  if (raw) {
    try {
      const value = JSON.parse(raw) as Record<string, { verdict?: string }>;
      if (value && typeof value === "object") parsed = value;
    } catch {
      parsed = {};
    }
  }
  const items = q.items.map((item) => {
    const picked = parsed[item.id]?.verdict;
    const expected = item.ok ? "ok" : "ko";
    const pass = picked === expected;
    return {
      id: `${q.id}:${item.id}`,
      label: item.code.split("\n")[0] ?? item.id,
      pass,
      points: pass ? item.points : 0,
      max: item.points,
      detail: item.why,
    };
  });
  return {
    score: items.reduce((sum, item) => sum + item.points, 0),
    max: items.reduce((sum, item) => sum + item.max, 0),
    items,
  };
}

export function gradeExam(
  questions: ExamQuestion[],
  answers: Record<string, string>,
  overrides: Record<string, boolean> = {},
): GradeDetail {
  const details = questions.map((q) => gradeQuestion(q, answers[q.id], overrides));
  return {
    score: details.reduce((sum, detail) => sum + detail.score, 0),
    max: details.reduce((sum, detail) => sum + detail.max, 0),
    items: details.flatMap((detail) => detail.items),
  };
}
