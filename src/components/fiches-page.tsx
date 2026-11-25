import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { fiches } from "@/data/fiches";
import { lessonById } from "@/data/lessons";
import { CodeBlock } from "@/components/rich";
import { Shell } from "@/components/shell";

export function FichesPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(fiches[0]?.id ?? null);
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return fiches;
    return fiches.filter((fiche) => {
      const blob = `${fiche.title} ${fiche.syntax} ${fiche.remember.join(" ")} ${fiche.traps.join(" ")}`.toLowerCase();
      return blob.includes(needle);
    });
  }, [query]);

  return (
    <Shell>
      <p className="text-sm font-semibold tracking-[0.16em] text-copper uppercase">Mémo</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Fiches à relire la veille</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        Une syntaxe par notion, les rappels, les pièges. Cache le code, essaie de le réécrire, puis ouvre.
      </p>
      <label className="mt-6 block max-w-md text-sm font-semibold text-ink">
        Filtrer
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="trigger, TRUNC, séquence…"
          className="mt-1 min-h-11 w-full rounded-2xl border border-line bg-sheet px-4 text-base font-normal outline-none focus:border-teal"
        />
      </label>
      <div className="mt-6 flex flex-col gap-3">
        {visible.map((fiche) => {
          const lesson = lessonById(fiche.lessonId);
          const shown = open === fiche.id;
          return (
            <article key={fiche.id} className="rounded-2xl border border-line bg-sheet p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl text-ink">{fiche.title}</h2>
                  {lesson ? (
                    <Link
                      to="/parcours/$lessonId"
                      params={{ lessonId: lesson.id }}
                      className="text-sm font-semibold text-teal-deep"
                    >
                      Leçon {lesson.index} · {lesson.title}
                    </Link>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(shown ? null : fiche.id)}
                  className="min-h-11 rounded-full border border-line px-4 text-sm font-semibold"
                >
                  {shown ? "Cacher le code" : "Montrer le code"}
                </button>
              </div>
              {shown ? <div className="mt-4"><CodeBlock code={fiche.syntax} /></div> : (
                <p className="mt-3 text-sm text-muted">Code masqué. Réécris-le sur papier, puis ouvre.</p>
              )}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-teal-deep uppercase">À retenir</p>
                  <ul className="mt-2 flex flex-col gap-2 text-sm">
                    {fiche.remember.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-copper uppercase">Pièges</p>
                  <ul className="mt-2 flex flex-col gap-2 text-sm">
                    {fiche.traps.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
        {visible.length === 0 ? <p className="text-muted">Aucune fiche ne contient ce mot.</p> : null}
      </div>
    </Shell>
  );
}
