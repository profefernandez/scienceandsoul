# Deploying Science & Soul Counseling to your sPanel VPS

Target server: `cloud-0edbbf.managed-vps.net` (165.140.156.47), 2-core VPS,
Postgres on port **6543**, managed with sPanel by 60 Watts of Clarity.

In production one Node.js process serves everything: the built website
(static files) **and** the API, on a single port. It also sends the security
headers (CSP, HSTS, nosniff) itself, so no extra header config is needed in
Apache/nginx beyond a plain reverse proxy.

## 1. One-time server prep

1. In sPanel, create (or pick) the account/domain for the site.
2. Install **Node.js 20+** and **pnpm** for that account:
   ```bash
   curl -fsSL https://get.pnpm.io/install.sh | sh -
   ```
3. Create a Postgres database + user in sPanel (Postgres runs on port 6543).
   Note the database name, user, and password.

## 2. Get the code onto the server

Clone the GitHub repository on the server, or download the repository as a zip
from GitHub and upload/extract it via sPanel's file manager. The whole repo goes
to something like `/home/YOURUSER/app`.

## 3. Build

From the repo root on the server:

```bash
pnpm install

# Build the website (base path is / on your own domain)
BASE_PATH=/ PORT=8080 pnpm --filter @workspace/science-and-soul run build

# Build the API server
pnpm --filter @workspace/api-server run build
```

## 4. Configure environment

```bash
cp .env.example .env
nano .env
```

Fill in:
- `DATABASE_URL` — optional Postgres credentials on port 6543, reserved for
  future server features. The current website does not store visitor data.

## 5. Database schema (optional)

The current website does not require database tables. When a future feature
adds a schema, apply it with:

```bash
DATABASE_URL='postgresql://...:6543/...' pnpm --filter @workspace/db run push
```

## 6. Run it (persistent)

Use pm2 so the app survives reboots:

Create `ecosystem.config.cjs` in the repo root (pm2 reads env values from it
safely — no shell parsing of secrets):

```js
require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  apps: [
    {
      name: "science-and-soul",
      cwd: __dirname + "/artifacts/api-server",
      script: "dist/index.mjs",
      node_args: "--enable-source-maps",
      env: process.env,
    },
  ],
};
```

Then:

```bash
npm install -g pm2
pnpm add -w dotenv        # one-time, used only by the pm2 config file
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup
```

(Or use sPanel's Node.js app manager if your version has one: entry point
`artifacts/api-server/dist/index.mjs`, with the `.env` variables set in its UI.)

Check it responds locally: `curl -I http://127.0.0.1:8080/` → should return
200 with a `Content-Security-Policy` header.

## 7. Point the domain at the server

At the domain registrar, either:
- set nameservers to `ns1.cloud-0edbbf.managed-vps.net` / `ns2.cloud-0edbbf.managed-vps.net`, or
- keep existing DNS and add an **A record** → `165.140.156.47` (plus `www`).

## 8. Reverse proxy + HTTPS

In sPanel, add the domain and issue a Let's Encrypt certificate, then proxy
the domain to the Node app (Apache example):

```apache
ProxyPreserveHost On
ProxyPass / http://127.0.0.1:8080/
ProxyPassReverse / http://127.0.0.1:8080/
RequestHeader set X-Forwarded-Proto "https"
```

The `X-Forwarded-Proto https` header is what switches on the
Strict-Transport-Security header in the app.

**Firewall:** block direct public access to port 8080 (only the reverse proxy
on the same machine should reach it). The app trusts the proxy's forwarded
client IP for rate limiting, so the Node port must not be reachable from the
internet directly.

## 9. Verify after go-live

- `https://yourdomain.com` loads the site, chat orb works, contact form sends.
- `curl -I https://yourdomain.com` shows `Content-Security-Policy`,
  `Strict-Transport-Security`, and `X-Content-Type-Options: nosniff`.
- A POST to `/api/orb/chat` from another website's origin is rejected (CORS).
- More than 30 chat messages in 10 minutes → HTTP 429 (rate limit working).

## Updating the site later

Push the changes to GitHub, pull them on the server, rerun step 3, then
`pm2 restart science-and-soul`.
