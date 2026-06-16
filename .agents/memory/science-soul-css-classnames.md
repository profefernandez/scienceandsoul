---
name: Science & Soul CSS class names
description: Naming-collision hazard in artifacts/science-and-soul/src/styles/site.css
---

The `science-and-soul` artifact's `site.css` uses extremely terse, abbreviated global class
names (e.g. `.ci` for chakra-strip items, `.fi` for fade-in, `.ww` for width-wrapper,
`.sc-*`, `.pl/pa/ps/pt` pills). It is one big flat global stylesheet, no CSS modules.

**Rule:** When adding a new component with its own CSS, give it a distinctive namespaced
prefix (e.g. `.colimg`, `.colimg-base`) rather than a short 2-char name.

**Why:** A new `.ci` block for a ColoringImage component silently collided with the existing
`.ci` chakra-strip rule (`display:flex`), overriding `position:relative` and breaking absolute
canvas layering. The collision is invisible until layout breaks.

**How to apply:** Before introducing any new short class name in this artifact, grep site.css
for the name first; prefer a multi-char namespaced prefix unique to the component.
