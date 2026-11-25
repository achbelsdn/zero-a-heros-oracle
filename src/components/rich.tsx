import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Block } from "@/data/types";

export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={index} className="rounded bg-mist px-1 py-0.5 font-mono text-sm text-teal-deep">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export function CodeBlock({
  code,
  title,
  caption,
  tone = "ink",
}: {
  code: string;
  title?: string;
  caption?: string;
  tone?: "ink" | "sheet";
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }
  const dark = tone === "ink";
  return (
    <figure className="overflow-hidden rounded-2xl border border-line">
      {title ? (
        <figcaption className="flex items-center justify-between gap-3 border-b border-line bg-sheet px-4 py-2 text-sm font-semibold text-ink">
          <span>{title}</span>
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-teal-deep hover:bg-mist"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copié" : "Copier"}
          </button>
        </figcaption>
      ) : null}
      <div className="relative">
        {!title ? (
          <button
            type="button"
            onClick={copy}
            className={`absolute top-2 right-2 inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-xs font-semibold ${dark ? "text-sheet hover:bg-sheet/15" : "text-teal-deep hover:bg-mist"}`}
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copié" : "Copier"}
          </button>
        ) : null}
        <pre
          className={`overflow-x-auto p-4 font-mono text-sm leading-relaxed ${dark ? "bg-ink text-sheet" : "bg-sheet text-ink"} ${title ? "" : "pt-14 sm:pt-4"}`}
        >
          <code>{code}</code>
        </pre>
      </div>
      {caption ? <p className="border-t border-line bg-sheet px-4 py-3 text-sm text-muted">{caption}</p> : null}
    </figure>
  );
}

const calloutStyle = {
  tip: "border-teal bg-mist text-teal-deep",
  trap: "border-copper bg-copper-soft text-ink",
  exam: "border-ink bg-sheet text-ink",
} as const;

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, index) => {
        if (block.type === "prose") {
          return (
            <div key={index} className="flex flex-col gap-3">
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base text-ink">
                  <Rich text={paragraph} />
                </p>
              ))}
            </div>
          );
        }
        if (block.type === "recipe") {
          return (
            <div key={index} className="rounded-2xl border border-line bg-sheet p-4 sm:p-5">
              <h3 className="font-display text-xl text-ink">{block.title}</h3>
              <ol className="mt-3 flex flex-col gap-3">
                {block.items.map((item, itemIndex) => (
                  <li key={item} className="flex gap-3 text-base">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-teal font-mono text-xs text-sheet">
                      {itemIndex + 1}
                    </span>
                    <span>
                      <Rich text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          );
        }
        if (block.type === "code") {
          return <CodeBlock key={index} code={block.code} title={block.title} caption={block.caption} />;
        }
        if (block.type === "compare") {
          return (
            <div key={index} className="flex flex-col gap-3">
              <h3 className="font-display text-xl text-ink">{block.title}</h3>
              <div className="grid gap-3 lg:grid-cols-2">
                <CodeBlock code={block.bad} title="À ne pas rendre" tone="sheet" />
                <CodeBlock code={block.good} title="Forme juste" />
              </div>
              <p className="text-sm text-muted">
                <Rich text={block.note} />
              </p>
            </div>
          );
        }
        if (block.type === "callout") {
          return (
            <aside key={index} className={`rounded-2xl border-l-4 px-4 py-3 ${calloutStyle[block.tone]}`}>
              <p className="text-sm font-semibold tracking-wide uppercase">{block.title}</p>
              <p className="mt-1 text-base">
                <Rich text={block.body} />
              </p>
            </aside>
          );
        }
        return (
          <div key={index} className="overflow-x-auto rounded-2xl border border-line bg-sheet">
            {block.title ? <p className="px-4 pt-4 font-display text-xl text-ink">{block.title}</p> : null}
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-muted">
                  {block.columns.map((column) => (
                    <th key={column} className="px-4 py-3 font-semibold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join("|")} className="border-b border-line last:border-0">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-3 align-top text-ink">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
