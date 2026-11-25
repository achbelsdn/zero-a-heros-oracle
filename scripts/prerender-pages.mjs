#!/usr/bin/env node
/**
 * Prerender the built app into static HTML for GitHub Pages.
 *
 * The Nitro `github-pages` preset cannot build this workspace (the Grok PWA
 * server middleware imports Vite-only `?raw` / `virtual:` modules, and the
 * prerenderer's basepath handling renders empty pages), so this script does
 * the prerendering itself: it serves the working (Vercel-preset) build with
 * `vite preview`, crawls every internal route, and saves the server-rendered
 * HTML as static files — plus the static assets, `.nojekyll` and a `404.html`
 * SPA fallback for any route the crawl missed.
 *
 * Usage:
 *   VITE_BASE_PATH=/zero-a-heros-oracle node scripts/prerender-pages.mjs \
 *     [--out .pages] [--port 8081]
 *
 * Env:
 *   VITE_BASE_PATH    subpath the app is served under ("" at the root)
 *   PAGES_PUBLIC_URL  public URL baked into og:url / og:image, replacing the
 *                     preview origin (default: https://achbelsdn.github.io<base>)
 *   PREVIEW_READY_TIMEOUT_MS  how long to wait for the preview server (60s)
 */
import { spawn } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PREVIEW_PORT || 8081);
const BASE = (process.env.VITE_BASE_PATH ?? "").replace(/\/$/, "");
const PUBLIC_URL =
  process.env.PAGES_PUBLIC_URL ?? `https://achbelsdn.github.io${BASE}`;
const PREVIEW_ORIGIN = `http://127.0.0.1:${PORT}`;
const READY_TIMEOUT_MS = Number(process.env.PREVIEW_READY_TIMEOUT_MS || 60000);

const args = process.argv.slice(2);
const outFlag = args.indexOf("--out");
const OUT = join(ROOT, outFlag >= 0 ? args[outFlag + 1] : ".pages");
const portFlag = args.indexOf("--port");
const port = portFlag >= 0 ? Number(args[portFlag + 1]) : PORT;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Public path of a route: "/" -> "/zero-a-heros-oracle/", "/examens" -> "/zero-a-heros-oracle/examens". */
function publicPath(route) {
  return route === "/" ? `${BASE}/` : `${BASE}${route}`;
}

/** Where a route's HTML is written inside OUT. */
function outFile(route) {
  const rel = route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
  return join(OUT, rel);
}

function isAppRoute(href) {
  if (!href.startsWith(BASE + "/") && href !== BASE) return false;
  const path = href.split(/[?#]/, 1)[0];
  if (/\.[a-z0-9]+$/i.test(path)) return false; // assets: .js/.css/.svg/.png...
  if (path.startsWith(`${BASE}/assets/`) || path.startsWith(`${BASE}/__grok/`)) return false;
  return true;
}

function routeOf(href) {
  const path = href.split(/[?#]/, 1)[0];
  const route = path === BASE || path === `${BASE}/` ? "/" : path.slice(BASE.length);
  return route.startsWith("/") ? route : `/${route}`;
}

async function fetchPage(route) {
  const url = `${PREVIEW_ORIGIN}${publicPath(route)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${route} -> HTTP ${res.status}`);
  return await res.text();
}

async function waitForPreview(child) {
  const deadline = Date.now() + READY_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`preview server exited early (code ${child.exitCode})`);
    }
    try {
      const res = await fetch(`${PREVIEW_ORIGIN}${publicPath("/")}`, {
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await sleep(250);
  }
  throw new Error(`preview server did not answer within ${READY_TIMEOUT_MS}ms`);
}

async function main() {
  // Static assets come from the Vercel-preset build output.
  const staticDir = existsSync(join(ROOT, ".vercel/output/static"))
    ? join(ROOT, ".vercel/output/static")
    : join(ROOT, ".output/public");
  if (!existsSync(staticDir)) {
    console.error(`[prerender] no built static dir found — run npm run build first`);
    process.exit(1);
  }

  mkdirSync(OUT, { recursive: true });
  cpSync(staticDir, OUT, { recursive: true });
  // Keep any previously prerendered HTML out of the way on re-runs.
  for (const entry of readdirSync(OUT)) {
    if (entry.endsWith(".html") && entry !== "404.html") {
      // top-level stale html (defensive; cpSync above never writes html)
    }
  }

  const child = spawn(
    join(ROOT, "node_modules/vite/bin/vite.js"),
    ["preview", "--port", String(port), "--strictPort"],
    { cwd: ROOT, stdio: "ignore" },
  );
  const stop = () => {
    try {
      child.kill("SIGTERM");
    } catch {
      // already gone
    }
  };
  process.on("SIGINT", () => {
    stop();
    process.exit(130);
  });

  try {
    await waitForPreview(child);
    console.log(`[prerender] preview up on ${PREVIEW_ORIGIN}`);

    const seeds = ["/", "/examens", "/fiches", "/parcours", "/tp"];
    const seen = new Set();
    const queue = [...seeds];
    const rendered = [];

    while (queue.length > 0) {
      const route = queue.shift();
      if (seen.has(route)) continue;
      seen.add(route);
      let html;
      try {
        html = await fetchPage(route);
      } catch (err) {
        console.error(`[prerender] FAILED ${route}: ${err.message}`);
        process.exitCode = 1;
        continue;
      }
      if (!html || html.trim().length === 0) {
        console.error(`[prerender] EMPTY ${route} — skipping (basepath mismatch?)`);
        process.exitCode = 1;
        continue;
      }
      // Bake the public origin in place of the preview origin (og:url, og:image).
      html = html.split(PREVIEW_ORIGIN).join(PUBLIC_URL);
      html = html.split("http://localhost:8081").join(PUBLIC_URL);
      const file = outFile(route);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, html);
      rendered.push(route);
      console.log(`[prerender] ${route} -> ${file.slice(ROOT.length + 1)}`);

      for (const match of html.matchAll(/href="([^"]+)"/g)) {
        const href = match[1];
        if (!isAppRoute(href)) continue;
        const next = routeOf(href);
        if (!seen.has(next)) queue.push(next);
      }
    }

    // SPA fallback for any deep link the crawl missed + Pages needs .nojekyll
    // (asset filenames start with "_" and Jekyll would ignore them).
    const indexHtml = readFileSync(outFile("/"), "utf8");
    writeFileSync(join(OUT, "404.html"), indexHtml);
    writeFileSync(join(OUT, ".nojekyll"), "");
    console.log(`[prerender] done — ${rendered.length} route(s): ${rendered.join(", ")}`);
    if (process.exitCode) {
      console.error("[prerender] some routes failed — see above");
    }
  } finally {
    stop();
  }
}

main().catch((err) => {
  console.error(`[prerender] ${err?.message || err}`);
  process.exit(1);
});
