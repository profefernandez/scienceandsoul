# Science & Soul — Prebuilt Deploy Bundle

This archive contains the **already-built** website + API server. No compilation
is required on the server — just Node.js 20+ to run it.

## What's inside

```
artifacts/
  api-server/
    dist/                       ← Node.js server bundle (esbuild, self-contained)
    ecosystem.config.cjs.example
    package.json
  science-and-soul/
    dist/public/                ← Static frontend (HTML/CSS/JS + assets)
    package.json
.env.example
DEPLOY.md                       ← Full step-by-step (reverse proxy, HTTPS, DNS)
README.md
```

The API server bundle at `artifacts/api-server/dist/index.mjs` is **self-contained**
(esbuild bundled all runtime dependencies). You do NOT need to run `pnpm install`
or `npm install` on the server for the app to boot.

## Fast path (5 minutes)

On the VPS as your sPanel account user:

```bash
# 1. Upload + extract this zip somewhere like /home/YOURUSER/app
cd /home/YOURUSER/app

# 2. Configure environment
cp .env.example .env
nano .env
#    Set at minimum:
#      NODE_ENV=production
#      PORT=8080
#    DATABASE_URL is optional — the current site does not persist visitor data.

# 3. Smoke-test it runs
cd artifacts/api-server
NODE_ENV=production PORT=8080 node --enable-source-maps ./dist/index.mjs &
curl -I http://127.0.0.1:8080/           # → 200 + Content-Security-Policy header
kill %1

# 4. Run under pm2 so it survives reboots
cd /home/YOURUSER/app
cp artifacts/api-server/ecosystem.config.cjs.example ./ecosystem.config.cjs
npm install -g pm2
npm install dotenv --no-save    # used only by ecosystem.config.cjs
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup
```

Then wire up the reverse proxy + HTTPS in sPanel as described in `DEPLOY.md`
sections 7–9 (proxy the public domain to `http://127.0.0.1:8080/`).

## Where the frontend lives at runtime

The server auto-locates the static files at
`../../science-and-soul/dist/public` relative to `artifacts/api-server/dist/`,
which is exactly the layout in this zip. If you move things around, set
`STATIC_DIR` in `.env` to the absolute path of `dist/public`.

## Updating later

Rebuild locally (or in CI), regenerate this zip, upload, extract in place,
`pm2 restart science-and-soul`.
