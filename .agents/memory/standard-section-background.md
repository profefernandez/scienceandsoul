---
name: Standard section background (watercolor wash)
description: Site-wide background rule for Science & Soul — the env-bg watercolor wash is THE standard section background.
---
The watercolor wash from `public/img/env-bg-1600.webp`, applied via the shared `.washbg` fixed layer rule in site.css (rendered once in App.tsx), is THE standard section background site-wide.

**Rule:** Any new section must inherit it automatically (sections stay transparent or use translucent tints so the wash shows through). Variations may only come from overlay tint, opacity, or background-position on this same asset — never a new background image.

**Why:** User directive (July 2026) to unify all sections on one consistent watercolor look with no seams and no extra image assets.

**How to apply:** Do not give sections opaque backgrounds. For the translucent band treatment, use the shared `.band` class in site.css (plus `.bandnb` to drop the bottom border) — never inline section background/border styles; inline styles caused the wash rollout to miss sections. Dark mode uses a dimmed overlay on the same asset (see `[data-theme="dark"] .washbg`). Never use `background-attachment: fixed` (broken on iOS) — the fixed-position `.washbg` div is the mobile-safe mechanism. The botanical garland in the contact section is decor, not background — leave it in place, don't replicate it.
