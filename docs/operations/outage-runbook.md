# Short Outage Triage Runbook

Use this runbook for brief production outages (for example 1-5 minutes) before and after deploys.

## 1) Confirm impact quickly

1. Check homepage:
   - `curl -I https://<domain>/`
2. Check API health:
   - `curl -sS https://<domain>/api/healthz`
   - Expect `{"status":"ok"}`
3. If either fails, record UTC timestamp and failure mode (timeout, 5xx, 404, TLS, etc).

## 2) Check deployment activity

1. In GitHub Actions, inspect recent `Deploy to VPS` runs.
2. Look for:
   - canceled runs
   - overlapping runs
   - failed upload/verify steps
3. Capture run URL(s) and commit SHA(s) for incident notes.

## 3) Check production logs/metrics

Collect logs for the outage window (at least ±10 minutes):

- Reverse proxy / web server access + error logs (Apache/nginx/sPanel)
- Node process logs if API server is serving traffic (pm2/app logs)
- HTTP status trends: spikes of 5xx/404, latency, connection resets

Signals that support deploy-related partial update issues:
- 404s for hashed frontend assets immediately after deploy start
- index/html requests succeeding while asset requests fail
- outage start/stop aligned with a deploy run duration

## 4) Verify current deployment state

1. Ensure deployed files exist and are coherent:
   - `index.html` present
   - referenced hashed assets exist in the deployed assets directory
2. Verify security headers remain present:
   - `curl -I https://<domain>/` (check CSP, HSTS, `X-Content-Type-Options`)

## 5) Rollback guidance (safe + minimal)

If active outage persists:

1. Re-deploy the last known good commit through the normal workflow.
2. If workflow is unavailable, restore last known good `public_html` backup on VPS.
3. Re-run health checks (`/` and `/api/healthz`) immediately after rollback.

## 6) Record the incident and changes

1. Add an entry to root `CHANGELOG.md` with:
   - date/time (UTC)
   - confirmed evidence
   - inferred cause (explicitly labeled as inferred)
   - remediation
   - validation commands/results
   - follow-up monitoring
2. If remediation changes deployment behavior, update `DEPLOY.md`.
