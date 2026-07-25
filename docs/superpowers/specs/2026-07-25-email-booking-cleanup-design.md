# Email Booking Cleanup Design

## Goal

Remove the unused contact-form and Resend inquiry pipeline while preserving the visible Schedule Now email-provider popup and the LaunchLemonade embed. Make the Gmail, Outlook, and Yahoo logos load from public URLs.

## Scope

### Remove unused inquiry pipeline

- Delete the unmounted `ContactForm` component.
- Remove the `/api/inquiries` Express route and its inquiry-only rate limiter.
- Remove the inquiry operation and schemas from the local OpenAPI specification.
- Regenerate the API client and Zod outputs from the reduced specification.
- Remove the inquiry database table source and export, while retaining the PostgreSQL workspace for future features.
- Remove dependencies used only by this pipeline: `resend`, `express-rate-limit`, and the API server's `@workspace/db` dependency.
- Remove `RESEND_API_KEY` and obsolete contact-form or Resend wording from environment, deployment, project, privacy, and accessibility documentation.

### Preserve active integrations

- Keep the LaunchLemonade embed unchanged.
- Keep `/api/healthz` unchanged.
- Keep the Schedule Now popup and its Gmail, Outlook, Yahoo Mail, and default-email actions unchanged.
- Keep PostgreSQL workspace configuration, even though the current website will not actively use it after this cleanup.

### Fix provider logos

- Use the existing public Google favicon URLs for Gmail, Microsoft Outlook, and Yahoo.
- Permit `https://www.google.com` in both Vite development CSP and Express production CSP.
- Keep the existing local SVG envelope for Other / Default.

## Data Flow

Selecting Schedule Now opens the existing provider modal. Selecting Gmail, Outlook, or Yahoo opens that provider's compose URL in a new tab. Selecting Other / Default uses `mailto:`. No request is sent to the local API or PostgreSQL.

LaunchLemonade continues to load directly from its external embed script and is independent of the booking popup.

## Error Handling

Provider labels remain visible if an external logo cannot load, so the action stays understandable. The default-email option remains available without any external image dependency.

## Validation

1. Regenerate API and Zod code from `openapi.yaml`.
2. Regenerate the pnpm lockfile and confirm removed dependencies are absent.
3. Run the full workspace typecheck and production build.
4. Search source and documentation for stale Resend and contact-form implementation references.
5. Open the site and verify the Schedule Now modal displays all three provider logos and links correctly.
