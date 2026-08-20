# AgentPost — Master Build Specification

**Document type:** Mandatory product & design specification for AI app builders (Lovable, Wix, Base44, or equivalent)
**Prepared for:** AgentPost founder
**Status:** Authoritative — supersedes any default template, starter theme, or generic pattern the builder would otherwise reach for

---

## 0. MANDATORY INSTRUCTIONS TO THE BUILDER — READ FIRST

This document is a **specification, not a suggestion list**. Follow it exactly.

1. **Do not skip, shorten, summarize, or silently substitute any requirement below.** If something is genuinely ambiguous or technically impossible on your platform, stop and ask a clarifying question before proceeding — do not quietly do something different and call it done.
2. **Do not fall back on your own default template, starter kit, or "best practice" boilerplate** for the landing page, hero section, color scheme, or copywriting. Section 8 (Design System) and Section 9 (Copywriting Rules) are binding, not inspirational.
3. **Build every feature listed in Sections 5 and 6**, not a subset. If you must sequence the build, follow the phasing in Section 10 — but do not quietly drop later phases; treat them as backlog, not as cut.
4. **The single hardest requirement in this document is Section 9: no AI-generated look or language.** The product must read and look like it was built by a specific, opinionated human design team — not like a generic AI-generated SaaS template. Re-read Section 9 before writing a single line of landing-page copy or choosing a single color.
5. If you produce a plan, a set of pages, or a component list before writing code, **check it against this document section by section** before proceeding, and note explicitly which sections it satisfies.
6. This file is portable: it must work as a complete brief regardless of which AI app builder is reading it (Lovable, Wix, Base44, or others). Do not assume a specific proprietary starter template that isn't described here.

---

## 1. Product Vision

**AgentPost is the all-in-one command center for anyone who runs a brand's presence online** — creators, freelancers, small businesses, and marketing agencies — unifying social scheduling, advertising, website analytics, competitor intelligence, and reporting into a single dashboard, with a genuine autonomous AI agent at its core rather than a chatbot bolted onto a scheduler.

The category (social media management software) is large — roughly **$36–39 billion in 2026, growing 17–25% annually** — and dominated by tools that are either too expensive and complex for small teams (Hootsuite, Sprout Social) or too narrow to be a real command center (Buffer). AgentPost's opening is to be **the tool that actually does what its name promises**: an agent that acts on a user's behalf, not just a calendar with an AI label stuck on it.

**Positioning statement** (use as the literal seed for hero copy, not verbatim boilerplate):
> AgentPost is built for people who run a brand's online presence and are tired of doing it by hand across a dozen tabs. It plans, posts, tracks, and reports — and its AI agent can actually do the work, not just suggest it.

---

## 2. Who This Is For

Build with these three users in mind at every screen — every feature should be legible to at least one of them:

| Segment | Who they are | What they need most |
|---|---|---|
| **Solo creators & freelancers** | One person, one-to-few brands, price-sensitive, mobile-first | A generous free tier, dead-simple onboarding, fast mobile posting |
| **Small business owners** | Non-marketers running their own social presence alongside the rest of the business | Clarity over complexity; "just tell me what to post and when" |
| **Agencies & marketing teams** | Manage 5–50+ client brands, need approvals and client-ready reporting | Multi-brand management, white-label reports, team roles/permissions |

---

## 3. Core Differentiation (what must feel different from Metricool, Buffer, Hootsuite, Sprout Social)

1. **A real agent, not a chat wrapper.** The AI in AgentPost should visibly *do things* — draft a week of posts, propose a schedule, flag a competitor's move — not just answer questions in a sidebar.
2. **Value-dense free tier.** The free plan must feel genuinely useful on its own, not a crippled trial. This is the growth engine (see Section 6.11 and the strategy doc referenced in Section 12).
3. **Global from day one.** Multi-language UI, multi-currency/PPP pricing, and non-US payment rails are first-class requirements, not a later localization pass.
4. **Breadth without bloat.** Every added surface (ads, website analytics, SmartLinks, inbox) must live inside one coherent Brand-centric model — never feel like five products stitched together.

---

## 4. Information Architecture

Build this as the site/app map. Do not invent a different top-level structure.

**Public / marketing site:**
- Home (hero + product story) — see Section 8
- Features (deep page per major feature area)
- Pricing (with region-aware currency display)
- Comparison pages: "AgentPost vs. Hootsuite," "AgentPost vs. Buffer," "AgentPost vs. Metricool" (own, original copy only — never copy competitor language)
- AgentPost Academy (free courses/certification — see 6.9)
- Blog / resource center
- Security & Privacy page (see 7.3)
- Sign up / Log in

**Authenticated app:**
- Brand switcher (global, always visible — the Brand is the core organizing unit, see 6.1)
- Planner (unified content calendar)
- AI Agent panel (persistent, not buried in settings)
- Publishing / Post composer
- Ads (campaign management)
- Analytics (social + website + competitors)
- Social Inbox (unified messages/comments)
- Reputation (reviews, local business — see 6.6)
- Commerce (shop/catalog sync — see 6.5)
- SmartLinks (link-in-bio builder)
- Reports (custom + AI-generated + Campaign Dashboards)
- Team & Permissions
- White-label / Agency settings (see 6.7, agency accounts only)
- Integrations marketplace (see 6.10)
- Settings (connections, billing, security)

---

## 5. Baseline Platform Features — must all be built

These are the foundational features already scoped for AgentPost. None of these are optional.

### 5.1 Brands — the core data model
- A **Brand** is a container for one business or client: one profile per connected platform.
- Free plan: 1 Brand. Paid plans: multiple Brands, addable/removable.
- Every other feature (Planner, Analytics, Ads, Inbox) is scoped to the active Brand, with a fast global Brand switcher.

### 5.2 Platform connections
Support connecting: Facebook (Pages/Groups), Instagram (Business/Creator), TikTok, LinkedIn (profiles + Company Pages), X/Twitter, Pinterest, YouTube, Twitch, Google Business Profile, Threads, Bluesky, plus **WhatsApp Business, Telegram, and Discord** (new — see 6.8), and website/blog tracking via JS tag, WordPress plugin, or tracking pixel. Also connect ad accounts: Meta Ads, Google Ads, TikTok Ads.
- Clear, platform-by-platform connection wizards with explicit permission explanations (never a vague "accept all permissions" dead end).
- Token/connection health monitoring with proactive reconnect prompts before expiry.

### 5.3 Planner & publishing
- Unified drag-and-drop content calendar across all connected platforms.
- Per-platform post preview (exact rendering per network).
- Best-time-to-post suggestions based on the Brand's own audience data.
- Auto-publishing, bulk/CSV scheduling, evergreen content recycling ("autolists"), drafts/notes.
- Approval workflows for team/agency accounts before anything goes live.

### 5.4 Advertising
- Manage Meta Ads, Google Ads, and TikTok Ads campaigns from one dashboard: budgets, statuses, objectives, and results, organic and paid side by side.
- One-click boosting of eligible organic posts.

### 5.5 Analytics & competitor tracking
- Engagement, reach, audience growth, and content-type breakdowns per platform.
- Website analytics (real-time visits, unique visitors) with a plain-language explainer of how this differs from Google Analytics (different methodology, not a bug).
- Competitor tracking (public-data based) and hashtag trend tracking.

### 5.6 Reporting
- Branded, exportable PDF/PPT reports.
- Campaign Dashboards grouping organic + paid content under one client-ready view, shareable via a read-only branded link (no login required for the client).
- AI-generated report narration ("what changed and why") in plain language.

### 5.7 SmartLinks
- Link-in-bio page builder: buttons, sections, theming, click analytics.

### 5.8 AI Assistant & MCP
- In-app AI assistant for caption ideas, tone adjustment, A/B copy variants.
- MCP (Model Context Protocol) connectivity so AgentPost can be driven from Claude, ChatGPT, or similar AI clients via plain language, available on every plan including Free.

### 5.9 Third-party integrations
Canva, Google Drive, Zapier, Adobe Express, Looker Studio, Google Tag Manager, WordPress, Shopify, Joomla, Wix, Squarespace.

---

## 6. New Features — the differentiators (must be built, not treated as "nice to have")

These are what separate AgentPost from being a Metricool clone. Build all of them; see Section 10 for suggested phasing if you must sequence delivery.

### 6.1 The AgentPost Agent
A genuinely autonomous agent, not a chat sidebar: with explicit permission, it researches trending topics and competitor activity in a Brand's niche, drafts a week of on-brand posts against the Brand's voice/history, and presents them for one-tap approval (approve all, edit, or reject individually). This is the product's single most important differentiator — build it as a first-class, persistent panel in the app, not a buried settings toggle.

### 6.2 GEO Score / AI Visibility Tracker
Track and help improve how often the Brand is cited by ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews when people ask relevant questions. Surface this as a trackable score with concrete improvement actions (an emerging, still-unclaimed category — build it early and market it clearly).

### 6.3 Social listening & sentiment
Brand-mention monitoring, sentiment scoring, and share-of-voice reporting — beyond the existing competitor/hashtag tracking.

### 6.4 In-app conversational AI over the Brand's own data
A chat interface inside the dashboard (not just via MCP) where a user can ask plain-language questions ("how did Reels do last month vs. this month?") and get a cited, data-grounded answer with charts.

### 6.5 Social commerce hub
TikTok Shop and Instagram/Facebook Shop catalog sync, shoppable-post tooling, and a UGC-to-shoppable-post pipeline.

### 6.6 Reputation & review management
Automated monitoring and AI-assisted response drafting for Google, Facebook, and Trustpilot reviews, integrated with the existing Google Business Profile connection — this extends AgentPost into local-business and multi-location use cases.

### 6.7 White-label / reseller tier
Custom domain and branding for agencies reselling AgentPost access to their own clients, plus API access. This is a paid-tier feature aimed at the agency segment specifically.

### 6.8 Expanded Social Inbox
Unify messages and comments from Instagram, Facebook, Google Business, **plus WhatsApp Business, Telegram, and Discord**, in one inbox with filtering, assignment, and read/unread/resolved states.

### 6.9 AgentPost Academy
A free certification course on social media management, hosted inside the product/marketing site — serves as both a genuine user-education asset and an organic-traffic engine.

### 6.10 Open integration marketplace
A public API and app directory so third-party developers can build on AgentPost, similar in spirit to a Zapier app directory.

### 6.11 In-product referral program
Give agencies and power users a direct, visible incentive (revenue share or account credit) to refer new customers, built into account settings — not an external, disconnected affiliate portal.

### 6.12 Native AI creative studio
Built-in AI image and short-form video generation for basic assets, so casual users are not forced to leave AgentPost for a design tool.

---

## 7. Non-Functional Requirements

### 7.1 Global-first, not US-first
- Ship the UI in at least English, Spanish, Portuguese, and French at launch, structured for easy addition of more languages.
- Prices must display in the visitor's local currency automatically, using purchasing-power-parity-adjusted pricing bands, not a flat currency conversion.
- Support regional payment methods beyond cards/PayPal for at least Latin America (Pix, Mercado Pago) and one additional region at launch.

### 7.2 Mobile
- The web app must be fully responsive and usable one-handed on a phone for core tasks (checking the calendar, approving an AI-drafted post, replying to a message) — this is not a "desktop first, mobile later" build.

### 7.3 Trust & compliance
- A public Security & Privacy page describing data handling, even before formal certification.
- GDPR-aware language and data-handling posture visible in the product and marketing site.
- Role-based permissions per Brand for team members (owner/admin/editor/client-viewer, at minimum).

### 7.4 Platform API resilience
- Build connections defensively against third-party API/policy changes (Meta, TikTok, X); never rely on undocumented or unofficial endpoints.

---

## 8. Design System & UI/UX — Home Page and Landing Page Requirements

**This is the most important section for the builder's first deliverable. Read all of it before generating any page.**

### 8.1 Hero section (home page) — required elements
1. A **specific, benefit-led headline** that names what AgentPost actually does in plain language — not an abstract claim. It must pass this test: a small-business owner reading it for 3 seconds should understand what the product does, not just that it's "powerful" or "smart."
2. A **one-sentence subheadline** that names who it's for and the concrete outcome (time saved, results, clarity) — not a restatement of the headline in fancier words.
3. A **single, unambiguous primary call-to-action** ("Start free — no credit card" or equivalent), plus a clearly secondary action (e.g., "See how it works" / watch a short demo).
4. **A real product visual**, not an abstract illustration: an actual mock of the AgentPost dashboard, the Planner calendar, or the AI Agent panel in action — showing the product doing something specific (e.g., drafting a week of posts), not a generic screenshot.
5. Concrete proof elements where available (a specific stat, a specific outcome, a named use case) rather than vague trust badges.

### 8.2 Landing page structure (in order)
1. Hero (8.1)
2. A short "how it works" section in 3–4 concrete steps, each illustrated with a real UI moment, not an icon-and-adjective grid.
3. A feature section organized around **outcomes** ("Plan a month of content in 20 minutes," "See what's actually working," "Never miss a message"), each backed by the specific feature that delivers it — not a flat list of every feature with generic icons.
4. A differentiation section that plainly (and honestly, without disparaging competitors by name in a way that could read as attack marketing) explains why AgentPost is different: the real agent, the global pricing, the breadth in one Brand model.
5. Pricing preview with real numbers and the free tier prominent.
6. Final call-to-action section, distinct in tone from the hero (not a repeat of the same headline).

### 8.3 Visual and brand direction
- Pick **one specific, opinionated color palette and typography pairing** and apply it with discipline across every page — do not default to a generic purple-to-blue gradient, a stock "SaaS dashboard" template feel, or an unstyled component-library look.
- Use real interface screenshots/mocks and, where illustration is used, a distinct, consistent illustration style — not generic 3D-blob or abstract-gradient-shape stock art.
- Motion should be purposeful (drawing attention to a real product moment) rather than decorative background animation for its own sake.
- Design for both a confident, professional feel (this handles a business's ad budget and client relationships) and an approachable one (a solo creator should not feel like they need an enterprise IT department to use it).

---

## 9. Copywriting & Anti-"AI Slop" Rules — mandatory, apply everywhere

The single most important instruction in this document: **AgentPost must not read or look like it was generated by an AI template.** Every page — marketing site and in-app — must sound like it was written by a specific person who understands social media management, not by a generic content generator.

### 9.1 Banned words and phrases (do not use these anywhere in UI copy, marketing copy, or headlines)
"Revolutionize," "unlock the power of," "seamless(ly)," "cutting-edge," "game-changer," "elevate your," "supercharge," "next-generation," "empower," "unleash," "in today's fast-paced digital landscape," "the future of," "all-in-one solution" (say specifically what it unifies instead), "leverage," "robust," "state-of-the-art," "effortlessly," "at the click of a button," any sentence that could be published unchanged for a different product by swapping the name.

### 9.2 Banned visual clichés
Generic purple/blue gradient backgrounds as a default theme; floating abstract 3D shapes/blobs with no relation to the product; glowing-brain or circuit-board "AI" imagery; robot mascots; excessive glassmorphism; stock photos of diverse people pointing at a laptop screen smiling; a "✨ AI-Powered" badge slapped on every feature card; overuse of sparkle/star icons next to anything AI-related.

### 9.3 What to do instead
- Write headlines and feature descriptions as if explaining the product to a specific real person (a freelance social media manager, a small bakery owner) in a normal conversation — specific, concrete, slightly informal, never breathless.
- Prefer showing a real product screen over describing a feature abstractly.
- Vary sentence length and rhythm the way a person writes, not the uniform cadence of generated marketing copy.
- When describing AI capability, describe the concrete action it takes ("drafts a week of posts based on what worked last month") rather than the abstraction ("harnesses the power of AI").
- Every claim should be falsifiable/specific where possible (a number, a named workflow, a named platform) rather than a vague superlative.

---

## 10. Suggested Build Phasing (do not use as an excuse to skip later phases)

1. **Phase 1 — Core:** Brands, connections, Planner/publishing, basic analytics, Social Inbox (existing channels), pricing/billing, landing page and marketing site to full spec in Sections 8–9.
2. **Phase 2 — Differentiators:** AgentPost Agent (6.1), expanded inbox channels (6.8), social listening (6.3), in-app AI chat over data (6.4).
3. **Phase 3 — Monetization & scale:** White-label tier (6.7), referral program (6.11), Ads management, Reporting/Campaign Dashboards, PPP pricing/localization (7.1).
4. **Phase 4 — Category expansion:** GEO Score (6.2), Social commerce hub (6.5), Reputation management (6.6), integration marketplace (6.10), AgentPost Academy (6.9), native creative studio (6.12).

---

## 11. Reference Context (for the builder's understanding only — not verbatim source material)

This specification is derived from an internal market and competitive analysis of the social media management category (Hootsuite, Sprout Social, Zoho Social, SOCi, Buffer, SocialPilot, Metricool), current as of August 2026. Do not use competitor product names, screenshots, or copy in the built product beyond factual, original comparison content on dedicated comparison pages.

---

## 12. Final Compliance Reminder

Before delivering any output against this brief — a plan, a page, or code — check it against Sections 5, 6, 8, and 9 explicitly. If a requirement was not met, say so directly rather than presenting incomplete work as complete. This document is the standing specification for AgentPost; treat every future request about this product as building on top of it, not replacing it, unless explicitly told otherwise.
