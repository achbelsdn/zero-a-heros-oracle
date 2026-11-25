import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const links = [
  { to: "/parcours", label: "Parcours" },
  { to: "/examens", label: "Examens" },
  { to: "/tp", label: "TP" },
  { to: "/fiches", label: "Fiches" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="group flex min-h-11 items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-ink font-display text-lg text-sheet">
              O
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-lg text-ink">Zéro à héros</span>
              <span className="block text-xs tracking-wide text-muted uppercase">Oracle · L3</span>
            </span>
          </Link>
          <nav className="flex min-w-0 items-center gap-1 overflow-x-auto">
            {links.map((link) => {
              const active = path === link.to || path.startsWith(`${link.to}/`);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-2 text-sm font-semibold sm:px-4 ${active ? "bg-ink text-sheet" : "text-ink hover:bg-sheet"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
