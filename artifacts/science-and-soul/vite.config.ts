import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

function cspPlugin(mode: string): Plugin {
  const isProd = mode === "production";

  // In development, Vite and @vitejs/plugin-react inject inline scripts for HMR
  // and React Fast Refresh — these require 'unsafe-inline'. Production builds
  // output no inline scripts, so we enforce a strict 'self'-only policy there.
  const scriptSrc = isProd ? "script-src 'self'" : "script-src 'self' 'unsafe-inline'";

  const csp = [
    "default-src 'self'",
    scriptSrc,
    // 'unsafe-inline' for styles: Vite dev server injects <style> tags for HMR.
    // React inline style={} props are applied via JS (DOM API) and do not require this.
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' https://user-gen-media-assets.s3.amazonaws.com data: blob:",
    "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
  ].join("; ");

  return {
    name: "csp-meta",
    transformIndexHtml() {
      return [
        {
          tag: "meta",
          attrs: { "http-equiv": "Content-Security-Policy", content: csp },
          injectTo: "head-prepend" as const,
        },
        {
          tag: "meta",
          attrs: { "http-equiv": "X-Content-Type-Options", content: "nosniff" },
          injectTo: "head-prepend" as const,
        },
        {
          tag: "meta",
          attrs: {
            "http-equiv": "Referrer-Policy",
            content: "strict-origin-when-cross-origin",
          },
          injectTo: "head-prepend" as const,
        },
      ];
    },
  };
}

export default defineConfig(async ({ mode }) => ({
  base: basePath,
  plugins: [
    react(),
    cspPlugin(mode),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
}));
