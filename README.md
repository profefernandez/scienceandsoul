# Science & Soul Counseling & Wellness, PLLC
Website for Kelly Nelson, LCSW — evidence-based therapy in Houston, Texas.  
Built with React + Vite (frontend) and Express (API server) in a pnpm monorepo.
---
## Tech Stack
| Layer           | Technology                                      |
| --------------- | ----------------------------------------------- |
| Frontend        | React 18, Vite 7, TypeScript                    |
| Styling         | Vanilla CSS (custom design system, no Tailwind) |
| API             | Express, TypeScript                             |
| Package manager | pnpm (workspace monorepo)                       |
| Deployment      | sPanel VPS                                      |
---
## Project Structure

/
├── artifacts/
│ ├── science-and-soul/ # React + Vite frontend
│ │ ├── public/ # Static assets (robots.txt, sitemap.xml, og-image.jpg, favicon)
│ │ ├── src/
│ │ │ ├── components/ # UI components (Nav, Footer, Hero, Services, etc.)
│ │ │ ├── hooks/ # Custom React hooks
│ │ │ ├── pages/ # Route-level pages (Home, Privacy, HIPAA, Accessibility)
│ │ │ └── styles/ # site.css — global design system
│ │ └── vite.config.ts
│ └── api-server/ # Express API server
│ └── src/
│ └── index.ts
├── pnpm-workspace.yaml
└── package.json

---
## Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+
### Install dependencies
```bash
pnpm install

Run in development
# Frontend (set PORT and BASE_PATH for your environment)
pnpm --filter @workspace/science-and-soul run dev
# API server
pnpm --filter @workspace/api-server run dev

Lint
cd artifacts/science-and-soul && pnpm run lint

Features
Responsive design — mobile-first, tested down to 360 px
Dark / light mode — persisted via localStorage
Accessibility (WCAG 2.1 AA+) — axe-core clean on all routes; keyboard-navigable sections; skip link; ARIA landmarks; focus-visible rings
Accessibility widget — built-in panel for text size, high contrast, reduced motion, highlight links, and reading mask
SEO — per-page meta/OG tags, JSON-LD (LocalBusiness + Therapist), sitemap.xml, robots.txt (AI-crawler rules included)
Legal pages — Privacy Policy, HIPAA Notice, Good Faith Estimate, Accessibility Statement
Coloring journal download — gated email capture, delivers PDF
Booking — "Schedule Now" opens the visitor's preferred email provider
Environment Variables
See `.env.example` for production server configuration. Never commit `.env`.

Accessibility Validation
Automated axe-core checks run against all routes:

bash artifacts/science-and-soul/scripts/a11y-validate.sh /            4181
bash artifacts/science-and-soul/scripts/a11y-validate.sh /privacy      4182
bash artifacts/science-and-soul/scripts/a11y-validate.sh /hipaa        4183
bash artifacts/science-and-soul/scripts/a11y-validate.sh /accessibility 4184

All routes must pass with zero violations before merging.

Deployment
Hosted on an sPanel VPS. Push to main, pull the changes on the server, rebuild,
and restart the application. The frontend is served by Vite in development; in
production the Express server serves the built frontend.

License
© 2026 Science and Soul Counseling & Wellness, PLLC. All rights reserved.
This codebase is proprietary and not licensed for reuse.
