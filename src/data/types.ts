export type CalloutTone = "tip" | "trap" | "exam";

export type Block =
  | { type: "prose"; paragraphs: string[] }
  | { type: "recipe"; title: string; items: string[] }
  | { type: "code"; title?: string; code: string; caption?: string }
  | { type: "compare"; title: string; bad: string; good: string; note: string }
  | { type: "callout"; tone: CalloutTone; title: string; body: string }
  | { type: "table"; title?: string; columns: string[]; rows: string[][] };

export type LessonStep = {
  id: string;
  kicker: string;
  title: string;
  blocks: Block[];
};

export type Mcq = {
  kind: "mcq";
  id: string;
  points: number;
  prompt: string;
  choices: { id: string; text: string }[];
  answer: string;
  why: string;
};

export type Rule = {
  id: string;
  label: string;
  points: number;
  match: RegExp;
  forbid?: RegExp;
};

export type CodeQ = {
  kind: "code";
  id: string;
  prompt: string;
  starter?: string;
  solution: string;
  why: string;
  checks: Rule[];
};

export type VerdictItem = {
  id: string;
  code: string;
  ok: boolean;
  why: string;
  points: number;
};

export type VerdictQ = {
  kind: "verdict";
  id: string;
  prompt: string;
  items: VerdictItem[];
};

export type ExamQuestion = Mcq | CodeQ | VerdictQ;

export type Lesson = {
  id: string;
  index: number;
  title: string;
  promise: string;
  minutes: number;
  skills: string[];
  steps: LessonStep[];
  drill: Mcq[];
};

export type Exam = {
  id: string;
  title: string;
  context: string;
  minutes: number;
  level: "échauffement" | "contrôle" | "partiel";
  intro: string;
  schemaTitle?: string;
  schema?: string;
  questions: ExamQuestion[];
};

export type Fiche = {
  id: string;
  lessonId: string;
  title: string;
  syntax: string;
  remember: string[];
  traps: string[];
};
