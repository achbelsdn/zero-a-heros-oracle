import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Clock, RotateCcw } from "lucide-react";
import { examById, exams } from "@/data/exams";
import type { CodeQ, ExamQuestion, VerdictQ } from "@/data/types";
import { gradeExam, gradeQuestion, questionMax } from "@/lib/grade";
import { useHydrated, useProgress } from "@/lib/progress";
import { CodeBlock, Rich } from "@/components/rich";
import { Shell } from "@/components/shell";

function examTotal(questions: ExamQuestion[]) {
  return questions.reduce((sum, question) => sum + questionMax(question), 0);
}

export function ExamsPage() {
  const hydrated = useHydrated();
  const attempts = useProgress((state) => state.attempts);
  const drafts = useProgress((state) => state.drafts);

  return (
    <Shell>
      <p className="text-sm font-semibold tracking-[0.16em] text-copper uppercase">Entraînement</p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl text-ink sm:text-5xl">
        Des copies dans le genre des sujets IG3
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        QCM de session, rattrapage, devoir école, contrôle du tableau, blocs anonymes, puis trois études
        de cas neuves. Tu écris. Tu rends. Ensuite seulement, le corrigé et le barème.
      </p>
      <div className="mt-8 grid gap-3">
        {exams.map((exam) => {
          const max = examTotal(exam.questions);
          const mine = hydrated ? attempts.filter((attempt) => attempt.examId === exam.id) : [];
          const best = mine.reduce((top, attempt) => {
            const detail = gradeExam(exam.questions, attempt.answers, attempt.overrides);
            return Math.max(top, detail.score);
          }, 0);
          const draft = hydrated ? drafts[exam.id] : undefined;
          return (
            <Link
              key={exam.id}
              to="/examens/$examId"
              params={{ examId: exam.id }}
              className="grid gap-3 rounded-2xl border border-line bg-sheet p-4 hover:border-teal sm:grid-cols-[1fr_auto] sm:items-center sm:p-5"
            >
              <span>
                <span className="text-xs font-semibold tracking-wide text-copper uppercase">
                  {exam.level} · {exam.minutes} min · {exam.questions.length} questions
                </span>
                <span className="mt-1 block font-display text-2xl text-ink">{exam.title}</span>
                <span className="mt-1 block text-sm text-muted">{exam.context}</span>
              </span>
              <span className="text-sm font-semibold text-ink">
                {draft ? "Brouillon en cours" : mine.length ? `Meilleur ${best}/${max}` : `${max} pts`}
              </span>
            </Link>
          );
        })}
      </div>
    </Shell>
  );
}

export function ExamPage({ examId }: { examId: string }) {
  const exam = examById(examId);
  if (!exam) {
    return (
      <Shell>
        <h1 className="font-display text-4xl">Cette copie est introuvable.</h1>
        <Link to="/examens" className="mt-4 inline-flex font-semibold text-teal-deep">
          Toutes les copies
        </Link>
      </Shell>
    );
  }
  return <Runner examId={exam.id} />;
}

function Runner({ examId }: { examId: string }) {
  const exam = examById(examId)!;
  const hydrated = useHydrated();
  const draft = useProgress((state) => state.drafts[examId]);
  const allAttempts = useProgress((state) => state.attempts);
  const attempts = useMemo(
    () => allAttempts.filter((attempt) => attempt.examId === examId),
    [allAttempts, examId],
  );
  const startDraft = useProgress((state) => state.startDraft);
  const setDraftAnswer = useProgress((state) => state.setDraftAnswer);
  const saveAttempt = useProgress((state) => state.saveAttempt);
  const setOverride = useProgress((state) => state.setOverride);
  const clearOverride = useProgress((state) => state.clearOverride);

  const [phase, setPhase] = useState<"brief" | "run" | "done">("brief");
  const [viewId, setViewId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const active = attempts.find((attempt) => attempt.id === viewId) ?? null;
  const answers = phase === "run" ? (draft?.answers ?? {}) : (active?.answers ?? {});

  useEffect(() => {
    if (phase !== "run") return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [phase]);

  const max = examTotal(exam.questions);
  const remaining = draft ? exam.minutes * 60 - Math.floor((now - draft.startedAt) / 1000) : exam.minutes * 60;

  function begin(fresh: boolean) {
    startDraft(examId, fresh);
    setPhase("run");
    setConfirm(false);
    setViewId(null);
  }

  function renderCopy() {
    if (!draft) return;
    const id = saveAttempt(examId, draft.answers);
    setViewId(id);
    setPhase("done");
    setConfirm(false);
  }

  function openAttempt(id: string) {
    setViewId(id);
    setPhase("done");
  }

  return (
    <Shell>
      <p className="text-sm text-muted">
        <Link to="/examens" className="font-semibold text-teal-deep">
          Examens
        </Link>
        <span> · {exam.context}</span>
      </p>

      {phase === "brief" ? (
        <section className="mt-3">
          <p className="text-xs font-semibold tracking-[0.16em] text-copper uppercase">{exam.level}</p>
          <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">{exam.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">{exam.intro}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3 max-w-lg">
            <div className="rounded-2xl bg-sheet p-3">
              <dt className="text-xs text-muted">Durée</dt>
              <dd className="font-display text-2xl">{exam.minutes} min</dd>
            </div>
            <div className="rounded-2xl bg-sheet p-3">
              <dt className="text-xs text-muted">Barème</dt>
              <dd className="font-display text-2xl tabular-nums">{max}</dd>
            </div>
            <div className="rounded-2xl bg-sheet p-3">
              <dt className="text-xs text-muted">Questions</dt>
              <dd className="font-display text-2xl tabular-nums">{exam.questions.length}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => begin(true)}
              className="inline-flex min-h-11 items-center rounded-full bg-teal px-5 font-semibold text-sheet"
            >
              {hydrated && draft ? "Recommencer à zéro" : "Commencer la copie"}
            </button>
            {hydrated && draft ? (
              <button
                type="button"
                onClick={() => begin(false)}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-sheet px-5 font-semibold text-ink"
              >
                Reprendre le brouillon
              </button>
            ) : null}
          </div>
          {hydrated && attempts.length > 0 ? (
            <div className="mt-8">
              <h2 className="font-display text-2xl">Copies déjà rendues</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {attempts.map((attempt) => {
                  const detail = gradeExam(exam.questions, attempt.answers, attempt.overrides);
                  return (
                    <li key={attempt.id}>
                      <button
                        type="button"
                        onClick={() => openAttempt(attempt.id)}
                        className="flex min-h-11 w-full items-center justify-between rounded-2xl border border-line bg-sheet px-4 text-left"
                      >
                        <span>{new Date(attempt.at).toLocaleString("fr-FR")}</span>
                        <span className="font-semibold tabular-nums">
                          {detail.score}/{detail.max}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {phase === "run" ? (
        <section className="mt-3 pb-24">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h1 className="font-display text-4xl text-ink">{exam.title}</h1>
            <p className={`inline-flex items-center gap-2 font-mono text-sm tabular-nums ${remaining < 0 ? "text-bad" : "text-ink"}`}>
              <Clock className="size-4" />
              {formatTime(remaining)}
              {remaining < 0 ? " · temps dépassé" : ""}
            </p>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Le corrigé est masqué. Rends la copie pour le débloquer. Le brouillon est gardé si tu quittes.
          </p>
          {exam.schema ? (
            <div className="mt-5">
              <CodeBlock code={exam.schema} title={exam.schemaTitle ?? "Modèle"} tone="sheet" />
            </div>
          ) : null}
          <div className="mt-6 flex flex-col gap-6">
            {exam.questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                index={index}
                question={question}
                value={answers[question.id]}
                onChange={(value) => setDraftAnswer(examId, question.id, value)}
              />
            ))}
          </div>
          <div className="sticky bottom-3 mt-6 flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-line bg-paper/95 p-3">
            {confirm ? (
              <>
                <p className="mr-auto text-sm text-ink">Rendre la copie ? Le corrigé s’affiche ensuite.</p>
                <button type="button" onClick={() => setConfirm(false)} className="min-h-11 rounded-full px-4 font-semibold">
                  Continuer
                </button>
                <button type="button" onClick={renderCopy} className="min-h-11 rounded-full bg-copper px-4 font-semibold text-sheet">
                  Oui, corriger
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setConfirm(true)} className="min-h-11 rounded-full bg-ink px-5 font-semibold text-sheet">
                Rendre la copie
              </button>
            )}
          </div>
        </section>
      ) : null}

      {phase === "done" && active ? (
        <Result
          examId={examId}
          attemptId={active.id}
          answers={active.answers}
          overrides={active.overrides}
          onOverride={(key, pass) => setOverride(active.id, key, pass)}
          onClear={(key) => clearOverride(active.id, key)}
          onRetry={() => begin(true)}
        />
      ) : null}
    </Shell>
  );
}

function Result({
  examId,
  answers,
  overrides,
  onOverride,
  onClear,
  onRetry,
}: {
  examId: string;
  attemptId: string;
  answers: Record<string, string>;
  overrides: Record<string, boolean>;
  onOverride: (key: string, pass: boolean) => void;
  onClear: (key: string) => void;
  onRetry: () => void;
}) {
  const exam = examById(examId)!;
  const detail = useMemo(
    () => gradeExam(exam.questions, answers, overrides),
    [exam.questions, answers, overrides],
  );
  const ratio = detail.max === 0 ? 0 : detail.score / detail.max;

  return (
    <section className="mt-3">
      <div className="rounded-3xl bg-ink p-5 text-sheet sm:p-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-sheet/70 uppercase">Copie corrigée</p>
        <p className="mt-2 font-display text-5xl tabular-nums">
          {detail.score}
          <span className="text-2xl text-sheet/70">/{detail.max}</span>
        </p>
        <p className="mt-2 max-w-xl text-sheet/80">
          {ratio >= 0.8
            ? "Solide. Relis seulement les points rouges."
            : ratio >= 0.5
              ? "La structure est là. Les points manquants sont presque toujours un mot du sujet ou un RAISE."
              : "Repars du parcours sur l’objet qui a tout raté, puis refais cette copie à blanc."}
        </p>
        <p className="mt-2 text-sm text-sheet/60">
          Le barème automatique cherche des mots-clés Oracle. S’il a raté une forme juste, marque le critère.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-sheet px-4 font-semibold text-ink"
        >
          <RotateCcw className="size-4" />
          Refaire à blanc
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {exam.questions.map((question, index) => {
          const graded = gradeQuestion(question, answers[question.id], overrides);
          return (
            <article key={question.id} className="rounded-2xl border border-line bg-sheet p-4 sm:p-5">
              <p className="text-sm font-semibold text-muted">
                Question {index + 1} · {graded.score}/{graded.max}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-ink">
                <Rich text={question.kind === "verdict" ? question.prompt : question.prompt} />
              </h2>
              {question.kind === "mcq" ? <McqResult questionId={question.id} answer={answers[question.id]} choices={question.choices} correct={question.answer} why={question.why} /> : null}
              {question.kind === "code" ? (
                <CodeResult
                  question={question}
                  raw={answers[question.id] ?? ""}
                  items={graded.items}
                  overrides={overrides}
                  onOverride={onOverride}
                  onClear={onClear}
                />
              ) : null}
              {question.kind === "verdict" ? (
                <VerdictResult question={question} raw={answers[question.id]} />
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function McqResult({
  choices,
  answer,
  correct,
  why,
}: {
  questionId: string;
  choices: { id: string; text: string }[];
  answer?: string;
  correct: string;
  why: string;
}) {
  return (
    <div className="mt-3">
      <ul className="flex flex-col gap-2">
        {choices.map((choice) => {
          const isCorrect = choice.id === correct;
          const picked = choice.id === answer;
          return (
            <li
              key={choice.id}
              className={`rounded-xl border px-3 py-2 text-sm ${isCorrect ? "border-good bg-mist" : picked ? "border-bad bg-bad-soft" : "border-line"}`}
            >
              {choice.text}
              {isCorrect ? " · réponse attendue" : ""}
              {picked && !isCorrect ? " · ton choix" : ""}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-sm text-muted">{why}</p>
    </div>
  );
}

function CodeResult({
  question,
  raw,
  items,
  overrides,
  onOverride,
  onClear,
}: {
  question: CodeQ;
  raw: string;
  items: { id: string; label: string; pass: boolean; points: number; max: number; overridable?: boolean }[];
  overrides: Record<string, boolean>;
  onOverride: (key: string, pass: boolean) => void;
  onClear: (key: string) => void;
}) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div>
        <p className="text-sm font-semibold text-ink">Ta réponse</p>
        <pre className="mt-2 overflow-x-auto rounded-2xl bg-paper p-4 font-mono text-sm leading-relaxed text-ink">
          {raw.trim() ? raw : "— copie vide —"}
        </pre>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((item) => {
          const adjusted = item.id in overrides;
          return (
            <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line px-3 py-2">
              <span className={item.pass ? "text-good" : "text-bad"}>
                {item.pass ? "Acquis" : "Manquant"} · {item.label}
                {adjusted ? " · ajusté" : ""}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-mono text-sm tabular-nums">
                  {item.points}/{item.max}
                </span>
                {adjusted ? (
                  <button type="button" onClick={() => onClear(item.id)} className="min-h-11 rounded-full px-3 text-sm font-semibold text-teal-deep">
                    Annuler
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOverride(item.id, !item.pass)}
                    className="min-h-11 rounded-full px-3 text-sm font-semibold text-teal-deep"
                  >
                    {item.pass ? "Je ne l’avais pas" : "Je l’avais"}
                  </button>
                )}
              </span>
            </li>
          );
        })}
      </ul>
      <CodeBlock code={question.solution} title="Corrigé" />
      <p className="text-sm text-muted">{question.why}</p>
    </div>
  );
}

function VerdictResult({ question, raw }: { question: VerdictQ; raw?: string }) {
  let parsed: Record<string, { verdict?: string; note?: string }> = {};
  try {
    parsed = raw ? (JSON.parse(raw) as Record<string, { verdict?: string; note?: string }>) : {};
  } catch {
    parsed = {};
  }
  return (
    <div className="mt-4 flex flex-col gap-3">
      {question.items.map((item) => {
        const picked = parsed[item.id]?.verdict;
        const pass = picked === (item.ok ? "ok" : "ko");
        return (
          <div key={item.id} className={`rounded-xl border p-3 ${pass ? "border-good" : "border-bad"}`}>
            <pre className="overflow-x-auto font-mono text-sm text-ink">{item.code}</pre>
            <p className="mt-2 text-sm font-semibold">
              {item.ok ? "Correcte" : "Incorrecte"}
              {picked ? "" : " · tu n’as pas tranché"}
              {picked && !pass ? " · ton verdict est à l’envers" : ""}
            </p>
            <p className="mt-1 text-sm text-muted">{item.why}</p>
            {parsed[item.id]?.note ? (
              <p className="mt-2 text-sm text-ink">Ta justification : {parsed[item.id]?.note}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function QuestionCard({
  index,
  question,
  value,
  onChange,
}: {
  index: number;
  question: ExamQuestion;
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-line bg-sheet p-4 sm:p-5">
      <p className="text-sm font-semibold text-copper">
        Question {index + 1}
        <span className="text-muted"> · {questionMax(question)} pts</span>
      </p>
      {question.kind !== "verdict" ? (
        <h2 className="mt-2 text-lg font-semibold text-ink">
          <Rich text={question.prompt} />
        </h2>
      ) : (
        <h2 className="mt-2 text-lg font-semibold text-ink">{question.prompt}</h2>
      )}
      {question.kind === "mcq" ? (
        <div className="mt-3 flex flex-col gap-2">
          {question.choices.map((choice) => (
            <label key={choice.id} className={`flex min-h-11 items-start gap-3 rounded-xl border px-3 py-3 ${value === choice.id ? "border-teal bg-mist" : "border-line"}`}>
              <input
                type="radio"
                className="mt-1"
                name={question.id}
                checked={value === choice.id}
                onChange={() => onChange(choice.id)}
              />
              <span>{choice.text}</span>
            </label>
          ))}
        </div>
      ) : null}
      {question.kind === "code" ? (
        <textarea
          value={value ?? question.starter ?? ""}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          className="mt-3 min-h-56 w-full resize-y rounded-2xl border border-line bg-paper p-4 font-mono text-sm leading-relaxed text-ink outline-none focus:border-teal"
          aria-label={`Réponse ${index + 1}`}
        />
      ) : null}
      {question.kind === "verdict" ? <VerdictEditor question={question} value={value} onChange={onChange} /> : null}
    </section>
  );
}

function VerdictEditor({
  question,
  value,
  onChange,
}: {
  question: VerdictQ;
  value?: string;
  onChange: (value: string) => void;
}) {
  let parsed: Record<string, { verdict?: string; note?: string }> = {};
  try {
    parsed = value ? (JSON.parse(value) as Record<string, { verdict?: string; note?: string }>) : {};
  } catch {
    parsed = {};
  }
  function update(id: string, patch: { verdict?: string; note?: string }) {
    const next = { ...parsed, [id]: { ...parsed[id], ...patch } };
    onChange(JSON.stringify(next));
  }
  return (
    <div className="mt-3 flex flex-col gap-3">
      {question.items.map((item) => {
        const current = parsed[item.id] ?? {};
        return (
          <div key={item.id} className="rounded-xl border border-line p-3">
            <pre className="overflow-x-auto font-mono text-sm text-ink">{item.code}</pre>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => update(item.id, { verdict: "ok" })}
                className={`min-h-11 rounded-full px-4 text-sm font-semibold ${current.verdict === "ok" ? "bg-teal text-sheet" : "border border-line"}`}
              >
                Correcte
              </button>
              <button
                type="button"
                onClick={() => update(item.id, { verdict: "ko" })}
                className={`min-h-11 rounded-full px-4 text-sm font-semibold ${current.verdict === "ko" ? "bg-ink text-sheet" : "border border-line"}`}
              >
                Incorrecte
              </button>
            </div>
            <label className="mt-3 block text-sm text-muted">
              Ta justification (non notée, relue avec le corrigé)
              <input
                value={current.note ?? ""}
                onChange={(event) => update(item.id, { note: event.target.value })}
                className="mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-base text-ink outline-none focus:border-teal"
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}

function formatTime(totalSeconds: number) {
  const sign = totalSeconds < 0 ? "−" : "";
  const abs = Math.abs(totalSeconds);
  const minutes = Math.floor(abs / 60);
  const seconds = abs % 60;
  return `${sign}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
