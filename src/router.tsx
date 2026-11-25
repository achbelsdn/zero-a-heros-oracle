import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { previewPathRewrite } from "@/lib/preview-path-prefix";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    // GitHub Pages project site: served under /zero-a-heros-oracle/ (set via
    // VITE_BASE_PATH at build time); everywhere else the app lives at /.
    basepath: import.meta.env.VITE_BASE_PATH || undefined,
    rewrite: previewPathRewrite(),
    defaultErrorComponent: AppErrorComponent,
  });
}
