# AgentPost — Phase 2 Build Specification: Production Backend & Integrations

**Document type:** Mandatory follow-on specification for AI app builders (Lovable, Wix, Base44, or equivalent)
**Depends on:** `AgentPost-Build-Brief.md` (Phase 1 — front-end product experience, already delivered)
**Status:** Authoritative continuation of the standing AgentPost specification — every rule in Section 0, Section 8 (design), and Section 9 (copywriting) of the Phase 1 brief still applies. This document does not replace them.

---

## 0. MANDATORY INSTRUCTIONS — READ FIRST

1. Phase 1 delivered a front-end product experience on local mock data. **This document defines what "done" means for Phase 2**: production authentication, database persistence, real platform connections, billing, AI integrations, and publishing APIs. Do not consider Phase 2 complete until every section below is satisfied.
2. **Do not silently downgrade scope.** If a specific integration (e.g., a given ad network or payment rail) is not feasible on your platform, say so explicitly and propose the closest supported alternative — do not quietly ship a stub and call it done.
3. **Preserve everything already built in Phase 1** — the UI, the design system, and the copy rules (no AI-generated look/language) are locked. Phase 2 is about wiring real data and services behind the existing interface, not restyling it.
4. **Every mock-data code path must be replaced or clearly flagged.** Do not leave silent fallbacks to fake data in production; if a live call fails, show a real error/empty state, never invented numbers.
5. Before declaring this phase complete, self-check against Section 10 (Definition of Done) explicitly, section by section.

---

## 1. Authentication & Accounts

- Real user authentication (email + password, plus at least one social/SSO login option) replacing any mock login.
- Multi-tenant account model: a **User** can belong to multiple **Workspaces/Agencies**, each Workspace owns multiple **Brands** (per the Brand model defined in the Phase 1 brief, Section 5.1/6.1).
- Role-based permissions per Brand: Owner, Admin, Editor, Client-Viewer (read-only, for client report sharing) — enforced server-side, not just hidden in the UI.
- Session security: secure token storage, session expiry/refresh, and account-level two-factor authentication as an option.
- Password reset, email verification, and account deletion/data-export flows (required for GDPR compliance — see Section 7).

## 2. Database & Persistence

Replace all local mock data with a real, persisted schema. At minimum, model:

- `users`, `workspaces`, `workspace_members` (role per workspace)
- `brands` (belongs to a workspace; one row per client/business)
- `platform_connections` (per brand: platform, account id, token metadata, status, expiry)
- `posts` (drafts, scheduled, published; per-platform variants, media references, approval state, author, approver)
- `campaigns` / `ad_accounts` / `ad_campaigns` (linked ad platform data)
- `analytics_snapshots` (time-series performance data per brand/platform, cached from provider APIs, not recomputed live on every page load)
- `competitors` (tracked public profiles per brand)
- `inbox_messages` (unified messages/comments across connected channels, with read/assigned/resolved state)
- `reports` (saved/scheduled report configs and generated outputs)
- `smartlinks` (link-in-bio pages and click events)
- `subscriptions` / `billing_accounts` (plan, region, currency, payment method reference)
- `referrals` (Section 6.11 of the Phase 1 brief)
- `audit_log` (who did what, when — required for agency/enterprise trust, Section 7.3)

Use real migrations (not ad hoc schema edits) and seed data that is clearly marked as seed/demo, never indistinguishable from live customer data.

## 3. Platform Connections (real OAuth, not mocked)

Implement live OAuth connection flows for, at minimum, the Phase 1 launch set:

- Meta (Facebook Pages/Groups, Instagram Business/Creator) — including the two-sided Page/Instagram link requirement described in the product spec.
- TikTok, LinkedIn (profile + Company Page), X/Twitter, Pinterest, YouTube (Google), Google Business Profile.
- WhatsApp Business, Telegram, Discord (per Phase 1 Section 6.8 — required, not optional).
- Website/blog tracking (JS tag + WordPress plugin path).
- Ad accounts: Meta Ads, Google Ads, TikTok Ads.

Requirements for every connection:
- Store and refresh tokens securely server-side; never expose tokens to the client.
- Track and surface token expiry/health per the durations already documented in the product's own help content (Meta/LinkedIn/Pinterest ~60 days, TikTok ~365 days, X indefinite-but-revocable) and proactively prompt reconnection before failure.
- Handle disconnect/reconnect edge cases: preserve historical synced data, prevent scheduled posts from silently failing without surfacing an error to the user.
- Respect each platform's current developer terms; do not use unofficial or reverse-engineered endpoints (Phase 1 Section 7.4).

## 4. Publishing

- Real scheduled and immediate publishing to every connected platform via each platform's official publishing API.
- A reliable job scheduler/queue (not client-side timers) to fire scheduled posts, with retry and failure-notification logic.
- Per-platform validation before publish (character limits, media specs, required fields) with clear pre-publish errors, not silent failures after the fact.
- Auto-publish, bulk/CSV import, and evergreen recycling (Phase 1 Section 5.3) all backed by the real queue, not mock timers.

## 5. AI Integrations

- Wire the **AgentPost Agent** (Phase 1 Section 6.1) to a real LLM backend capable of: researching current trends/competitor activity for a brand's niche, drafting on-brand post drafts from the brand's own history/voice, and returning them for one-tap approval in the UI already built.
- Wire the in-app AI chat over the brand's own data (Phase 1 Section 6.4) to real analytics data — answers must be grounded in actual stored metrics, not generated narrative.
- Keep the MCP (Model Context Protocol) integration working end-to-end against real data once persistence is live (Phase 1 Section 5.8).
- Add basic guardrails: rate limits on AI actions, a clear approval step before anything AI-drafted goes live, and logging of AI-initiated actions in the audit log.

## 6. Billing & Payments

- Real subscription billing (e.g., Stripe or an equivalent processor) implementing the tier structure already defined in the product/pricing pages (Free / Starter / Advanced / Custom).
- **Global-first pricing, not a US-only add-on**: display and charge in the visitor's local currency using purchasing-power-parity-adjusted bands (Phase 1 Section 7.1), and support at least one non-card regional payment rail (e.g., a Latin American method) at launch, expanding from there.
- Self-serve plan upgrade/downgrade, invoice history, and the referral-program credit/revenue-share mechanic (Phase 1 Section 6.11) wired to real billing events.
- Webhooks for payment success/failure handled server-side, keeping subscription state in the database in sync with the payment processor — never trust client-reported payment state.

## 7. Security, Compliance & Trust

- Enforce the role-based permissions from Section 1 on every server endpoint, not just in the UI.
- Maintain the audit log (Section 2) for account, billing, connection, and publishing actions.
- Implement the data-export and account-deletion flows referenced in Section 1 to back the public Security & Privacy page already specified in Phase 1 Section 7.3 — the page's claims must be true of the running system.
- Secrets (API keys, OAuth client secrets, tokens) must live in server-side secret storage, never in client-shipped code or committed to the repository.
- Add basic abuse protection on public endpoints (rate limiting on auth, AI generation, and publishing actions).

## 8. White-Label / Agency Tier (if not already scaffolded in Phase 1)

- Custom domain and branding support for agency accounts reselling access (Phase 1 Section 6.7), backed by real per-workspace theming/config in the database, not hardcoded values.
- API access for agency/enterprise tiers, authenticated separately from the main user session (API keys scoped per workspace).

## 9. Testing & Reliability

- Automated tests covering at minimum: auth flows, the Brand/permission model, publishing (including failure/retry paths), and billing webhooks.
- Error states for every external integration (platform APIs, AI provider, payment processor) must be visible and actionable in the UI — no silent failures, no fallback to fabricated data.
- Confirm the app still typechecks and renders correctly at desktop and mobile sizes after this phase, exactly as verified for Phase 1.

## 10. Definition of Done — self-check before reporting completion

- [ ] No mock/local data remains reachable in a production build; every data path is live.
- [ ] A new user can sign up, verify their email, create a Workspace and a Brand, and invite a teammate with a scoped role.
- [ ] At least the Phase 1 launch set of platform connections (Section 3) completes a real OAuth flow and a real post publishes successfully end-to-end.
- [ ] A subscription can be purchased, upgraded, downgraded, and cancelled through real billing, priced correctly for at least two different currencies/regions.
- [ ] The AgentPost Agent produces post drafts from real (not mocked) brand data and requires explicit approval before anything publishes.
- [ ] The audit log records real actions from real users.
- [ ] The Security & Privacy page's claims are true of the running system.
- [ ] Report explicitly which of the above are NOT yet true, if any — do not report full completion unless every box is genuinely checked.
