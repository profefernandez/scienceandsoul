import express, { type Express } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Behind a reverse proxy (nginx/sPanel in production), trust the first hop.
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use("/api", router);

// ---------------------------------------------------------------------------
// Production static serving of the built frontend with real security headers.
// In development the Vite dev server serves the frontend instead.
// ---------------------------------------------------------------------------
if (process.env.NODE_ENV === "production") {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const staticDir =
    process.env.STATIC_DIR ??
    path.resolve(here, "../../science-and-soul/dist/public");

  const csp = [
    "default-src 'self'",
    "script-src 'self' https://chat.launchlemonade.app https://*.launchlemonade.app",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://chat.launchlemonade.app https://*.launchlemonade.app",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' https://www.google.com https://user-gen-media-assets.s3.amazonaws.com https://chat.launchlemonade.app https://*.launchlemonade.app data: blob:",
    "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://chat.launchlemonade.app https://*.launchlemonade.app wss://*.launchlemonade.app",
    "frame-src https://chat.launchlemonade.app https://*.launchlemonade.app",
    "frame-ancestors 'self'",
  ].join("; ");

  app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", csp);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    if (req.secure || req.headers["x-forwarded-proto"] === "https") {
      res.setHeader("Strict-Transport-Security", "max-age=31536000");
    }
    next();
  });

  if (fs.existsSync(staticDir)) {
    app.use(express.static(staticDir));
    // SPA fallback: serve index.html for any non-API GET route.
    app.get(/^\/(?!api\/).*/, (_req, res) => {
      res.sendFile(path.join(staticDir, "index.html"));
    });
  } else {
    logger.warn({ staticDir }, "Static frontend directory not found; serving API only");
  }
}

export default app;
