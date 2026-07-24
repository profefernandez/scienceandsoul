---
name: Headless verification of science-and-soul
description: How to run playwright-core checks against the dev site without 404s or module errors
---
- Run playwright scripts from inside `artifacts/science-and-soul/` (module resolution) with `executablePath` from `which chromium`.
- **Use the direct Vite dev port (root path, e.g. `http://localhost:23173/`)** — hitting `http://localhost:80/science-and-soul/` in headless chromium renders the wouter 404 page because the dev server serves root-relative assets/base while the browser location keeps the prefix.
- Element screenshots render blank in headless (paint artifact); verify via `page.evaluate` computed styles / `currentSrc` instead.
- Responsive images: regenerate variants with `node scripts/gen-images.mjs` (sharp devDep); helpers in `src/lib/img.ts`; ColoringImage accepts srcSet/sizes.
