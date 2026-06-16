---
name: Launch Lemonade API integration
description: Working host/flow for the Launch Lemonade AI assistant, and who owns the prompt/KB.
---

# Launch Lemonade API

Used by the Chakra Orb AI Guide on the science-and-soul site (server proxy in api-server).

## Host quirk
- The official docs advertise `https://api.launchlemonade.app/v1/chat` (single call, `lemonade_id`/`message` → `{response}`). **That host is NXDOMAIN** — confirmed dead via Google + Cloudflare public DoH. Do not use it.
- The **working** host is `https://sip.launchlemonade.app` (Bubble-backed, the assistant runs "under bubble.io"). Endpoints:
  - `POST /api/1.1/wf/run_assistant` body `{assistant_id, conversation_id, input}` → `{Conversation_ID, Response_ID, Response, Error, Error_Reason}`
  - `POST /api/1.1/wf/get_run_assistant` body `{response_id}` → `{Response}`
- In practice `run_assistant` returns `Response` **inline**, so polling is usually unnecessary — but keep the poll fallback (every ~10s, up to ~1min) for when `Response` is empty and a `Response_ID` is present (per docs).
- Continuations: pass the returned `Conversation_ID` back as `conversation_id`; same ID is retained. An empty/missing `conversation_id` starts a new conversation.
- Auth: `Authorization: Bearer <LAUNCHLEMONADE_API_KEY>` (secret, server-side only). Base URL + assistant id are env-overridable (`LAUNCHLEMONADE_BASE_URL`, `LAUNCHLEMONADE_ASSISTANT_ID`).

## Prompt / KB ownership — decision
The **user owns the AI system prompt and knowledge base** inside their Launch Lemonade assistant. The server must NOT inject persona text or practice facts.
**Why:** user explicitly said "I am building the AI prompt and the KB, not you" after an earlier version injected a chakra persona + Kelly's practice knowledge server-side.
**How to apply:** the `/orb/chat` proxy forwards the visitor's raw message, only prepending a minimal parseable `[Chakra: <name>]` tag so the user's upstream prompt can adopt the selected persona. Do not re-add server-side persona/KB injection.
