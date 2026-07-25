import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Behind a reverse proxy (Replit proxy in dev, nginx/sPanel in production):
// trust the first hop so req.ip reflects the real client IP for rate limiting.
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

const allowedOrigins = new Set<string>(
  (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
);

if (process.env.REPLIT_DEV_DOMAIN) {
  allowedOrigins.add(`https://${process.env.REPLIT_DEV_DOMAIN}`);
}
if (process.env.REPLIT_DOMAINS) {
  for (const d of process.env.REPLIT_DOMAINS.split(",")) {
    if (d.trim()) allowedOrigins.add(`https://${d.trim()}`);
  }
}

app.use(
  cors({
    origin(origin, callback) {
      // Requests with no Origin header (same-origin, server-to-server, curl)
      // are allowed; browsers always send Origin on cross-origin requests.
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "OPTIONS"],
    credentials: false,
  }),
);

// 2mb comfortably fits the largest allowed imageDataUrl (1.5M chars of
// base64 ≈ 1.1MB decoded) plus the rest of the JSON payload.
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many chat messages from this address. Please wait a few minutes and try again." },
});

const inquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many inquiries from this address. Please try again later." },
});

app.use("/api/orb/chat", chatLimiter);
app.use("/api/inquiries", inquiryLimiter);

app.use("/api", router);

// CORS rejections -> 403 JSON instead of a 500 stack trace.
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err.message === "Not allowed by CORS") {
    res.status(403).json({ error: "Origin not allowed" });
    return;
  }
  next(err);
});

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
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' https://user-gen-media-assets.s3.amazonaws.com data: blob:",
    "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
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
