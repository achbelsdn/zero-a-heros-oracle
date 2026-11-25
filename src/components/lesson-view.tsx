import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { lessonById, lessons, nextLessonId, prevLessonId } from "@/data/lessons";
import type { Mcq } from "@/data/types";
import { Blocks, Rich } from "@/components/rich";
import { Shell } from "@/components/shell";
import { useHydrated, useProgress } from "@/lib/progress";

export function ParcoursPage() {
  const hydrated = useHydrated();
  const mastered = useProgress((state) => state.mastered);
  const drills = useProgress((state) => state.drills);
  return (
    <Shell>
      <p className="text-sm font-semibold tracking-[0.16em] text-copper uppercase">14 étapes</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Comment on crée chaque objet</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        Suis l’ordre. Une étape est maîtrisée quand le drill de fin est réussi aux deux tiers. Tu peux quand
        même sauter : rien n’est verrouillé.
      </p>
      <ol className="mt-8 flex flex-col gap-3">
        {lessons.map((lesson) => {
          const ok = hydrated && mastered.includes(lesson.id);
          const drill = hydrated ? drills[lesson.id] : undefined;
          return (
            <li key={lesson.id}>
              <Link
                to="/parcours/$lessonId"
                params={{ lessonId: lesson.id }}
                className="grid min-h-11 grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-line bg-sheet px-4 py-4 hover:border-teal sm:px-5"
              >
                <span className={`font-mono text-sm ${ok ? "text-teal" : "text-copper"}`}>
                  {String(lesson.index).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{lesson.title}</span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {lesson.minutes} min · {lesson.promise}
                  </span>
                </span>
                <span className="text-right text-sm font-semibold text-muted">
                  {ok ? "Maîtrisé" : drill ? `${drill.correct}/${drill.total}` : "À faire"}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </Shell>
  );
}

export function LessonPage({ lessonId }: { lessonId: string }) {
  const lesson = lessonById(lessonId);
  if (!lesson) {
    return (
      <Shell>
        <h1 className="font-display text-4xl">Cette étape n’existe pas.</h1>
        <Link to="/parcours" className="mt-4 inline-flex min-h-11 items-center font-semibold text-teal-deep">
          Retour au parcours
        </Link>
      </Shell>
    );
  }
  return <LessonPlayer lessonId={lesson.id} />;
}

function LessonPlayer({ lessonId }: { lessonId: string }) {
  const lesson = lessonById(lessonId)!;
  const hydrated = useHydrated();
  const storedStep = useProgress((state) => state.stepIndex[lessonId] ?? 0);
  const setStoredStep = useProgress((state) => state.setStep);
  const saveDrill = useProgress((state) => state.saveDrill);
  const drillResult = useProgress((state) => state.drills[lessonId]);
  const totalSteps = lesson.steps.length + 1;
  const [step, setStep] = useState(0);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (!hydrated || booted) return;
    setStep(Math.min(storedStep, totalSteps - 1));
    setBooted(true);
  }, [hydrated, booted, storedStep, totalSteps]);

  function go(next: number) {
    const value = Math.max(0, Math.min(totalSteps - 1, next));
    setStep(value);
    setStoredStep(lessonId, value);
  }

  const onDrill = step >= lesson.steps.length;
  const current = lesson.steps[step];
  const previous = prevLessonId(lessonId);
  const upcoming = nextLessonId(lessonId);

  return (
    <Shell>
      <p className="text-sm text-muted">
        <Link to="/parcours" className="font-semibold text-teal-deep">
          Parcours
        </Link>
        <span> · étape {lesson.index} / {lessons.length}</span>
      </p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">{lesson.title}</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted">{lesson.promise}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {lesson.skills.map((skill) => (
          <span key={skill} className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-teal-deep">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {lesson.steps.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => go(index)}
            className={`min-h-11 shrink-0 rounded-full px-3 text-sm font-semibold ${step === index ? "bg-ink text-sheet" : "bg-sheet text-ink border border-line"}`}
          >
            {index + 1}. {item.kicker}
          </button>
        ))}
        <button
          type="button"
          onClick={() => go(lesson.steps.length)}
          className={`min-h-11 shrink-0 rounded-full px-3 text-sm font-semibold ${onDrill ? "bg-copper text-sheet" : "border border-line bg-sheet text-ink"}`}
        >
          Drill
        </button>
      </div>

      <article className="mt-6">
        {onDrill || !current ? (
          <Drill
            questions={lesson.drill}
            previous={drillResult}
            onScore={(correct, total) => saveDrill(lessonId, correct, total)}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold tracking-[0.14em] text-copper uppercase">{current.kicker}</p>
            <h2 className="font-display text-3xl text-ink">{current.title}</h2>
            <Blocks blocks={current.blocks} />
          </div>
        )}
      </article>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(step - 1)}
          disabled={step === 0}
          className="inline-flex min-h-11 items-center gap-1 rounded-full border border-line bg-sheet px-4 font-semibold text-ink disabled:opacity-40"
        >
          <ChevronLeft className="size-4" />
          Avant
        </button>
        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={() => go(step + 1)}
            className="inline-flex min-h-11 items-center gap-1 rounded-full bg-teal px-4 font-semibold text-sheet"
          >
            Suite
            <ChevronRight className="size-4" />
          </button>
        ) : upcoming ? (
          <Link
            to="/parcours/$lessonId"
            params={{ lessonId: upcoming }}
            className="inline-flex min-h-11 items-center gap-1 rounded-full bg-ink px-4 font-semibold text-sheet"
          >
            Étape suivante
            <ChevronRight className="size-4" />
          </Link>
        ) : (
          <Link to="/examens" className="inline-flex min-h-11 items-center gap-1 rounded-full bg-ink px-4 font-semibold text-sheet">
            Passer aux examens
          </Link>
        )}
      </div>
      {previous && step === 0 ? (
        <p className="mt-3 text-sm text-muted">
          Étape précédente :{" "}
          <Link to="/parcours/$lessonId" params={{ lessonId: previous }} className="font-semibold text-teal-deep">
            {lessonById(previous)?.title}
          </Link>
        </p>
      ) : null}
    </Shell>
  );
}

function Drill({
  questions,
  previous,
  onScore,
}: {
  questions: Mcq[];
  previous?: { correct: number; total: number };
  onScore: (correct: number, total: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const correct = questions.filter((question) => answers[question.id] === question.answer).length;

  function submit() {
    setDone(true);
    onScore(correct, questions.length);
  }

  function retry() {
    setAnswers({});
    setDone(false);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-sm font-semibold tracking-[0.14em] text-copper uppercase">Drill</p>
        <h2 className="mt-1 font-display text-3xl text-ink">À toi, sans corrigé</h2>
        <p className="mt-2 text-muted">
          Deux tiers de justes, et l’étape est maîtrisée. Le corrigé s’ouvre seulement après ta remise.
          {previous ? ` Dernier score enregistré : ${previous.correct}/${previous.total}.` : ""}
        </p>
      </div>
      {questions.map((question, index) => (
        <fieldset key={question.id} className="rounded-2xl border border-line bg-sheet p-4 sm:p-5" disabled={done}>
          <legend className="px-1 text-base font-semibold text-ink">
            {index + 1}. <Rich text={question.prompt} />
          </legend>
          <div className="mt-3 flex flex-col gap-2">
            {question.choices.map((choice) => {
              const selected = answers[question.id] === choice.id;
              const good = done && choice.id === question.answer;
              const bad = done && selected && choice.id !== question.answer;
              return (
                <label
                  key={choice.id}
                  className={`flex min-h-11 items-start gap-3 rounded-xl border px-3 py-3 ${good ? "border-good bg-mist" : bad ? "border-bad bg-bad-soft" : selected ? "border-teal bg-mist" : "border-line"}`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    className="mt-1"
                    checked={selected}
                    onChange={() => setAnswers((current) => ({ ...current, [question.id]: choice.id }))}
                  />
                  <span>{choice.text}</span>
                </label>
              );
            })}
          </div>
          {done ? <p className="mt-3 text-sm text-muted">{question.why}</p> : null}
        </fieldset>
      ))}
      {!done ? (
        <button
          type="button"
          onClick={submit}
          disabled={Object.keys(answers).length < questions.length}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-copper px-5 font-semibold text-sheet disabled:opacity-40"
        >
          Corriger le drill
        </button>
      ) : (
        <div className="rounded-2xl bg-ink p-5 text-sheet">
          <p className="font-display text-4xl tabular-nums">
            {correct}/{questions.length}
          </p>
          <p className="mt-1 text-sheet/80">
            {correct / questions.length >= 2 / 3
              ? "Étape maîtrisée. Tu peux enchaîner."
              : "Pas encore. Relis l’étape, puis retente : les mêmes questions, une autre tête."}
          </p>
          <button type="button" onClick={retry} className="mt-4 inline-flex min-h-11 items-center rounded-full bg-sheet px-4 font-semibold text-ink">
            Retenter
          </button>
        </div>
      )}
    </div>
  );
}
