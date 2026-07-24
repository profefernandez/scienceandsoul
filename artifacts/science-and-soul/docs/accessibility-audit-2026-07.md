# Accessibility Audit Report — Science and Soul Counseling & Wellness

**Date:** July 24, 2026
**Scope:** All routes (`/`, `/privacy`, `/hipaa`, `/accessibility`), desktop (1280px), tablet (820px), and mobile (390px) viewports, light and dark themes.
**Standard:** WCAG 2.1 Levels A, AA, and AAA, plus axe-core best-practice rules.

## Tooling

- **axe-core** via `@axe-core/playwright` — repeatable automated scan: `pnpm run a11y-audit` (script at `scripts/a11y-audit.mjs`), 24 combinations (4 routes × 3 viewports × 2 themes). Supports `ROUTES`, `VIEWPORTS`, `THEMES` env vars for chunked runs.
- **eslint-plugin-jsx-a11y** — wired into `eslint.config.js`, run with `pnpm run lint`; catches accessibility regressions at build time.

## Final result

**PASS — 0 axe-core violations** across all 24 route/viewport/theme combinations, including with the accessibility widget panel open.

## Issues found and fixed

| Issue | WCAG | Fix |
|---|---|---|
| Legal pages rendered an empty `<title>` (react-helmet-async received split children from an HTML entity) | 2.4.2 (A) | Title passed as a single template string in `LegalPage.tsx` |
| No skip-to-content link | 2.4.1 (A) | Skip link added as first focusable element; `id="main"` on every page's `<main>` |
| Mobile menu and email-provider modal lacked focus management | 2.1.2 (A), 2.4.3 (A) | Shared `useFocusTrap` hook: traps Tab, closes on Escape, restores focus to invoking control |
| Form errors/status not announced to screen readers | 4.1.3 (AA) | `role="alert"` on errors, `role="status"` on success/loading, `aria-invalid` + `aria-describedby` on invalid fields (ContactForm, ColoringStudio) |
| Focus not moved to first invalid field on failed submit | 3.3.1 (A) | Focus moved to first errored input in ContactForm |
| Intent radio group had no group label | 1.3.1 (A) | `<fieldset>`/`<legend>` wrapper |
| Missing autocomplete on personal fields | 1.3.5 (AA) | `autocomplete` attributes on name/email/phone fields |
| Fees table used `<td>` for row headers | 1.3.1 (A) | `<th scope="row">` (Fees and Good Faith Estimate tables) |
| In-prose links distinguishable by color only | 1.4.1 (A) | Underlines on prose/footer links |
| No forced-colors (Windows High Contrast) support | Best practice | `@media (forced-colors: active)` rules |
| No print stylesheet | Best practice | `@media print` rules (hides nav/orb/widget, readable typography) |

## Manual checklist verification (60-item)

- **Visual & color:** AAA-target contrast verified in both themes by axe (`color-contrast-enhanced` rule, AAA 7:1); non-color cues on links and form errors; text resizes to 200% without breakage (widget text-size steps + browser zoom); visible focus indicators; no horizontal scroll at 390px.
- **Keyboard & navigation:** full keyboard access; logical tab order; skip link; unique descriptive page titles per route; consistent nav; `scroll-padding-top: 5rem` offsets anchors under the sticky header; focus restoration verified in email modal, mobile menu, and widget panel; no keyboard traps; no auto-focus on load.
- **Screen readers & structure:** semantic landmarks (`header`, `nav`, `main`, `footer`); sequential headings; `lang="en"`; `aria-live` regions for contact form and coloring studio states; `role="list"` retained on styled lists for Safari/VoiceOver; labeled SVG/icon buttons; descriptive anchor text.
- **Forms:** explicit `<label for>` on every field; specific error messages; focus-to-first-error; autocomplete attributes; pasting not blocked; no redundant data entry.
- **Motion, timing & cognition:** `prefers-reduced-motion` respected globally plus widget override; theme syncs with `prefers-color-scheme` (with manual toggle); no flashing content; no parallax/infinite scroll; plain language; consistent contact placement.
- **Dynamic components:** modals with focus trap + Escape + restoration; FAQ accordion uses native `<details>/<summary>` keyboard pattern; loading states announced.
- **Advanced:** forced-colors support; ≥44×44px targets on interactive controls; print stylesheet; layout is orientation-agnostic; no complex gestures; widget's reduce-motion control pauses animated content; `/accessibility` page includes direct feedback contact.

## Accessibility widget

Floating button (bottom-left, all pages) opens a keyboard- and screen-reader-accessible panel with: 3-step text sizing, high-contrast palette (light and dark), link highlighting, reduced motion, cursor-following reading mask, and simplified view. Preferences persist in `localStorage` and reapply on every visit. Verified: 0 axe violations with panel open; Escape closes and restores focus; settings survive reload.

## Re-running the audit

```bash
cd artifacts/science-and-soul
pnpm run a11y-audit          # full 24-combination scan
ROUTES=/ pnpm run a11y-audit # single route
pnpm run lint                # static jsx-a11y checks
```
