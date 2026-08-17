// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Hostinger shared hosting has no Node runtime — it serves static files from
  // public_html via Apache. The default cloudflare-module preset emits a Workers
  // fetch handler with no HTTP listener, which that hosting cannot run at all.
  // Disabling nitro lets TanStack Start's own prerenderer emit plain HTML into
  // dist/client instead (nitro's "static" preset conflicts with the Start
  // pipeline in this Nitro v3 beta — "rollupOptions.input should not be an
  // html file when building for SSR").
  nitro: false,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Every route is statically knowable: the only loader reads a hardcoded array
    // in src/data/projects.ts, so each page can be rendered once at build time and
    // keeps its per-project <title>/og:image from the route's head().
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoSubfolderIndex: true,
      failOnError: true,
    },
    pages: [
      { path: "/" },
      { path: "/projects/aparna-one" },
      { path: "/projects/duplex-house" },
      { path: "/projects/jayabheri-elevate" },
      { path: "/projects/sancia-villa" },
    ],
  },
});
