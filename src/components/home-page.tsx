import { Link } from "@tanstack/react-router";
import { ArrowRight, PenLine, ScrollText } from "lucide-react";
import { lessons } from "@/data/lessons";
import { exams } from "@/data/exams";
import { useHydrated, useProgress } from "@/lib/progress";
import { Shell } from "@/components/shell";

export function HomePage() {
  const hydrated = useHydrated();
  const mastered = useProgress((state) => state.mastered);
  const attempts = useProgress((state) => state.attempts);
  const done = hydrated ? mastered.length : 0;
  const next = lessons.find((lesson) => !mastered.includes(lesson.id)) ?? lessons[0];
  const pct = Math.round((done / lessons.length) * 100);

  return (
    <Shell>
      <section className="grid items-end gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-copper uppercase">
            Administration des bases de données
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[1.05] text-ink sm:text-6xl">
            Oracle, de zéro à <span className="italic text-teal-deep">héros</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Chaque notion dans l’ordre de la copie : comment on l’écrit, le piège qui coûte des points,
            puis des examens du même genre que ceux d’IG3. Le corrigé n’apparaît qu’après la remise.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/parcours/$lessonId"
              params={{ lessonId: next.id }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-teal px-5 font-semibold text-sheet hover:bg-teal-deep"
            >
              {done === 0 ? "Commencer par le terrain" : `Reprendre : ${next.title}`}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/examens"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-sheet px-5 font-semibold text-ink"
            >
              <PenLine className="size-4" />
              Passer une copie
            </Link>
            <Link
              to="/tp"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-copper bg-copper-soft px-5 font-semibold text-ink"
            >
              <ScrollText className="size-4" />
              Corrigé du TP
            </Link>
          </div>
        </div>
        <aside className="rounded-3xl border border-line bg-ink p-5 text-sheet">
          <p className="text-xs font-semibold tracking-[0.16em] text-sheet/70 uppercase">Ta copie</p>
          <p className="mt-3 font-display text-5xl tabular-nums">{pct}%</p>
          <p className="mt-1 text-sm text-sheet/75">
            {done} notion{done > 1 ? "s" : ""} maîtrisée{done > 1 ? "s" : ""} sur {lessons.length}
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-sheet/20">
            <div className="h-full rounded-full bg-teal" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-4 text-sm text-sheet/75">
            {hydrated && attempts.length > 0
              ? `${attempts.length} copie${attempts.length > 1 ? "s" : ""} rendue${attempts.length > 1 ? "s" : ""}. Tout reste sur cet appareil.`
              : "Aucune copie rendue. Tout restera sur cet appareil."}
          </p>
        </aside>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-3xl text-ink">Le parcours</h2>
          <Link to="/parcours" className="text-sm font-semibold text-teal-deep">
            Voir les 14 étapes
          </Link>
        </div>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {lessons.slice(0, 6).map((lesson) => {
            const ok = hydrated && mastered.includes(lesson.id);
            return (
              <li key={lesson.id}>
                <Link
                  to="/parcours/$lessonId"
                  params={{ lessonId: lesson.id }}
                  className="flex min-h-11 items-start gap-3 rounded-2xl border border-line bg-sheet p-4 hover:border-teal"
                >
                  <span className={`font-mono text-sm ${ok ? "text-teal" : "text-copper"}`}>
                    {String(lesson.index).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{lesson.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">{lesson.promise}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-3xl text-ink">Copies blanches</h2>
          <Link to="/fiches" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-deep">
            <ScrollText className="size-4" />
            Fiches express
          </Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {exams.slice(0, 3).map((exam) => (
            <Link
              key={exam.id}
              to="/examens/$examId"
              params={{ examId: exam.id }}
              className="rounded-2xl border border-line bg-sheet p-4 hover:border-teal"
            >
              <p className="text-xs font-semibold tracking-wide text-copper uppercase">{exam.level}</p>
              <p className="mt-2 font-display text-2xl text-ink">{exam.title}</p>
              <p className="mt-2 text-sm text-muted">{exam.context}</p>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}
