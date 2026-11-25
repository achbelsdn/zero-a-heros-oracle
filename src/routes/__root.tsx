import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "Zéro à Héros Oracle";

// Static-asset links must stay under the deploy base path (GitHub Pages
// project site lives under /<repo>/); at the root the prefix is empty.
const BASE = import.meta.env.VITE_BASE_PATH ?? "";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Parcours pas à pas et examens blancs corrigés pour l'UE Administration des bases de données Oracle, L3 AIP et ARI.",
      },
      { name: "theme-color", content: "#f3eee4" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: `${BASE}/favicon.svg` },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: `${BASE}/__grok/manifest.webmanifest` },
      { rel: "apple-touch-icon", href: `${BASE}/__grok/icon-180.png` },
    ],
  }),
  component: () => (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
