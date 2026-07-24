---
name: react-helmet-async title entity bug
description: HTML entities inside a Helmet <title> render an empty document title
---
Rule: In react-helmet-async, `<title>` must receive a single string child. Mixing text with JSX HTML entities (e.g. `&amp;`) or expressions splits children and Helmet silently renders an **empty** `<title>` tag.

**Why:** Legal pages failed axe `document-title` (WCAG 2.4.2) because `<title>{title} | ... &amp; ...</title>` produced `document.title === ""` despite a static fallback in index.html (Helmet's empty tag wins).

**How to apply:** Always write Helmet titles as one template string: `<title>{`${x} | Science and Soul Counseling & Wellness`}</title>`. Verify with `document.title` in a real browser, not just source inspection.
