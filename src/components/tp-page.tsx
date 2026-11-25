import { useMemo, useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import script from "../../tp_plsql_complet.sql?raw";
import { CodeBlock } from "@/components/rich";
import { Shell } from "@/components/shell";

const answers = [
  {
    q: "1.2",
    text: "Le message sort dans DBMS Output. Sans SET SERVEROUTPUT ON, le bloc réussit mais rien ne s’affiche.",
  },
  {
    q: "2.2 b",
    text: "Sans EXCEPTION : ORA-01403 (no data found). SELECT INTO exige exactement une ligne.",
  },
  {
    q: "3.3",
    text: "Sans NVL, le client 99999 renverrait NULL. SUM sur zéro ligne ne vaut pas 0.",
  },
  {
    q: "4.2",
    text: "Pas de COMMIT dans la procédure : l’appelant valide. Le script se termine par COMMIT, ce qui rend les essais définitifs.",
  },
  {
    q: "5.2",
    text: "a et b échouent (ORA-20030). c réussit : UPDATE stock ne met pas prix dans le SET, donc UPDATE OF prix ne part pas.",
  },
  {
    q: "5.4",
    text: "Avec le trigger : ORA-20032. Sans lui : ORA-02292, la clé étrangère (child record found).",
  },
];

type Slice = { id: string; title: string; code: string };

function slicesOf(sql: string): Slice[] {
  const lines = sql.replace(/^\uFEFF/, "").split("\n");
  const slices: Slice[] = [];
  let title = "Consignes et schéma";
  let buf: string[] = [];
  const push = () => {
    const code = buf.join("\n").trim();
    if (!code) return;
    slices.push({
      id: `s${slices.length}`,
      title,
      code,
    });
  };
  for (const line of lines) {
    const question = line.match(/^-- Question (.+)/);
    const part = line.match(/^-- PARTIE .+/);
    if (question || part) {
      push();
      title = (question?.[1] ?? line.replace(/^-- /, "")).trim();
      buf = [line];
    } else {
      buf.push(line);
    }
  }
  push();
  return slices;
}

export function TpPage() {
  const slices = useMemo(() => slicesOf(script), []);
  const [copied, setCopied] = useState(false);

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  function download() {
    const blob = new Blob([script], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tp-plsql.sql";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Shell>
      <p className="text-sm font-semibold tracking-[0.16em] text-copper uppercase">Sujet de TP · 5 pages</p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl text-ink sm:text-5xl">
        Triggers, fonctions et procédures
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        Corrigé complet, gardé dans l’application. Les codes -2020 et -2021 du sujet sont hors plage :
        Oracle n’accepte que -20000 à -20999, donc -20020 et -20021.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyAll}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-teal px-5 font-semibold text-sheet hover:bg-teal-deep"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Script copié" : "Copier tout le script"}
        </button>
        <button
          type="button"
          onClick={download}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-sheet px-5 font-semibold text-ink"
        >
          <Download className="size-4" />
          Télécharger le .sql
        </button>
      </div>

      <section className="mt-8 rounded-3xl border border-line bg-sheet p-5">
        <h2 className="font-display text-2xl text-ink">À adapter avant d’exécuter</h2>
        <p className="mt-2 text-muted">
          La base de classe existe déjà. Si DESCRIBE montre d’autres noms, remplace-les dans le script.
          Le prix d’une ligne est lu dans produits.prix.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="py-2 pr-4 font-semibold">Table</th>
                <th className="py-2 font-semibold">Colonnes supposées</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["clients", "id, nom, email, date_inscription"],
                ["commandes", "id, client_id, date_commande, montant"],
                ["categories", "id, nom"],
                ["produits", "id, nom, prix, categorie_id + stock"],
                ["commande_produits", "commande_id, produit_id, quantite"],
              ].map(([table, cols]) => (
                <tr key={table} className="border-b border-line last:border-0">
                  <td className="py-2 pr-4 font-mono text-teal-deep">{table}</td>
                  <td className="py-2 text-ink">{cols}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl text-ink">Réponses qui ne sont pas du code</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {answers.map((item) => (
            <li key={item.q} className="rounded-2xl border border-line bg-sheet px-4 py-3">
              <p className="text-xs font-semibold tracking-wide text-copper uppercase">Question {item.q}</p>
              <p className="mt-1 text-ink">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <nav className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {slices.map((slice) => (
          <a
            key={slice.id}
            href={`#${slice.id}`}
            className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-line bg-sheet px-3 text-sm font-semibold text-ink"
          >
            {slice.title}
          </a>
        ))}
      </nav>

      <div className="mt-4 flex flex-col gap-4">
        {slices.map((slice) => (
          <section key={slice.id} id={slice.id} className="scroll-mt-24">
            <CodeBlock code={slice.code} title={slice.title} />
          </section>
        ))}
      </div>
    </Shell>
  );
}
