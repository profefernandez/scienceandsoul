#!/usr/bin/env bash
# Runs the a11y audit for one or more routes. Reuses the already-running app on
# localhost:80 when available; otherwise boots a private dev server just for the scan.
# Usage: a11y-validate.sh <routes-csv> <fallback-port>
set -u
ROUTES_ARG="${1:?routes csv required}"
FALLBACK_PORT="${2:?fallback port required}"
cd "$(dirname "$0")/.."

BASE_URL="http://localhost:80"
SERVER_PID=""

cleanup() {
  if [ -n "$SERVER_PID" ]; then
    kill "$SERVER_PID" 2>/dev/null
    wait "$SERVER_PID" 2>/dev/null
  fi
}
trap cleanup EXIT

if ! curl -sf -o /dev/null --max-time 3 "$BASE_URL/"; then
  echo "App not running on :80 — starting a temporary dev server on :$FALLBACK_PORT"
  PORT="$FALLBACK_PORT" BASE_PATH="${BASE_PATH:-/}" pnpm run dev >/tmp/a11y-dev-server-"$FALLBACK_PORT".log 2>&1 &
  SERVER_PID=$!
  BASE_URL="http://127.0.0.1:$FALLBACK_PORT"
  for i in $(seq 1 60); do
    if curl -sf -o /dev/null --max-time 2 "$BASE_URL/"; then
      break
    fi
    if ! kill -0 "$SERVER_PID" 2>/dev/null; then
      echo "Dev server exited unexpectedly; log follows:"
      cat /tmp/a11y-dev-server-"$FALLBACK_PORT".log
      exit 1
    fi
    sleep 1
  done
  if ! curl -sf -o /dev/null --max-time 2 "$BASE_URL/"; then
    echo "Dev server failed to become ready on :$FALLBACK_PORT"
    exit 1
  fi
fi

ROUTES="$ROUTES_ARG" node scripts/a11y-audit.mjs "$BASE_URL/"
