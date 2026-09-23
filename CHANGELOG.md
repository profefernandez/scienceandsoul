# Changelog

## 2026-09-23

- Investigated a reported ~3 minute production outage with repository evidence from deployment and runtime configuration.
- Confirmed findings:
  - The production health endpoint exists at `/api/healthz` (`artifacts/api-server/src/routes/health.ts`).
  - Deployments use GitHub Actions + `rsync` directly into the live web root (`.github/workflows/deploy.yml`).
  - Deploy concurrency was configured to cancel in-progress deploys (`cancel-in-progress: true`), which can interrupt a live `rsync`.
- Most likely repository-backed cause (inferred, not definitive without production logs):
  - An in-progress deploy may have been canceled or updated mid-transfer, briefly leaving a partially updated `public_html` (for example `index.html` and hashed assets out of sync), causing temporary site unavailability.
- Remediation implemented:
  - Changed deploy concurrency to queue runs instead of canceling active deploys.
  - Updated deploy flow to upload into a per-run non-live staging directory first, then promote from staging into `public_html`.
  - Promotion uses delayed update/delete behavior to reduce mixed old/new asset windows during deployment.
- Validation performed:
  - `pnpm run typecheck`
  - `pnpm --filter @workspace/science-and-soul run lint`
  - `pnpm --filter @workspace/science-and-soul run build`
  - `pnpm --filter @workspace/api-server run build`
- Remaining monitoring / confirmation steps:
  - Correlate outage timestamp with GitHub Actions run status (especially canceled/in-progress runs).
  - Verify web server/app logs around incident window for missing asset 404 spikes and deployment timestamps.
  - After next deploy, verify homepage + `/api/healthz` and watch error rates for at least 10 minutes.
