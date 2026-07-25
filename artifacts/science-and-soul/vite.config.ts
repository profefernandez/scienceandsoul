import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

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

  // In production the Express server sends CSP / nosniff / Referrer-Policy as
  // real HTTP response headers (see artifacts/api-server/src/app.ts), so we
  // skip the meta tags entirely to avoid two competing policies.
  // In development, Vite and @vitejs/plugin-react inject inline scripts for HMR
  // and React Fast Refresh — these require 'unsafe-inline'.
  const scriptSrc =
    "script-src 'self' 'unsafe-inline' https://chat.launchlemonade.app https://*.launchlemonade.app";

  const csp = [
    "default-src 'self'",
    scriptSrc,
    // 'unsafe-inline' for styles: Vite dev server injects <style> tags for HMR.
    // React inline style={} props are applied via JS (DOM API) and do not require this.
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://chat.launchlemonade.app https://*.launchlemonade.app",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' https://www.google.com https://user-gen-media-assets.s3.amazonaws.com https://chat.launchlemonade.app https://*.launchlemonade.app data: blob:",
    "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://chat.launchlemonade.app https://*.launchlemonade.app wss://*.launchlemonade.app",
    "frame-src https://chat.launchlemonade.app https://*.launchlemonade.app",
  ].join("; ");

  return {
    name: "csp-meta",
    transformIndexHtml() {
      if (isProd) return [];
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

export default defineConfig(({ mode }) => ({
  base: basePath,
  plugins: [
    react(),
    cspPlugin(mode),
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
