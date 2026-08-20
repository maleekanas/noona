# AgentPost — Phase 3 Build Specification: Growth & Differentiation Features

**Document type:** Mandatory follow-on specification for AI app builders (Replit, Lovable, Wix, Base44, or equivalent)
**Depends on:** `AgentPost-Build-Brief.md` (Phase 1 — front-end product experience) and `AgentPost-Phase2-Backend-Brief.md` (Phase 2 — real auth, database, connections, publishing, billing, core AI wiring)
**Status:** Authoritative continuation of the standing AgentPost specification. Section 0 rules from Phase 1 (no skipping, no silent substitution, no default AI-template fallback) and the copywriting rules in Phase 1 Section 9 still apply to every page and string built in this phase.

---

## 0. MANDATORY INSTRUCTIONS — READ FIRST

1. **Do not start this phase until Phase 2's Definition of Done is genuinely satisfied.** These features depend on real persistence, real connections, and a real AI backend. Building them against mock data again would silently regress work already done — check Phase 2's checklist before touching this document.
2. This phase turns AgentPost from "a well-built scheduler with agentic AI" into **the category-defining product** described in the original market analysis — each feature below exists because it is a gap or unclaimed opportunity identified against real competitors (Hootsuite, Sprout Social, Zoho Social, SOCi, Buffer, SocialPilot, Metricool). Build them with that intent, not as decorative add-ons.
3. **Do not reuse competitor names, screenshots, or copy** anywhere in these features, including the comparison/GEO content described in Section 3.
4. Every new surface must follow the existing design system and copywriting rules exactly (no restyling, no reintroducing banned buzzwords or generic AI-template visuals) — these are additions to a finished design language, not a new one.
5. Self-check against Section 8 (Definition of Done) before reporting this phase complete, and explicitly list anything not fully met.

---

## 1. GEO Score / AI Visibility Tracker

**Why:** No competitor in the analyzed set (Hootsuite, Sprout Social, Zoho Social, SOCi) fully owns this yet. Being cited by ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews is becoming as important to brands as search-engine ranking — this is a genuine first-mover feature.

Build:
- A **GEO Score** per Brand: a single trackable number/trend representing how often and how favorably the brand is being surfaced by major AI assistants for queries relevant to its niche.
- A query-monitoring engine: a configurable set of representative prompts per Brand (e.g., "best [category] in [city]," "[brand] vs [competitor]") checked on a recurring schedule against available AI-search surfaces, storing whether/how the brand was mentioned.
- A concrete action list per Brand: specific, prioritized suggestions to improve citation likelihood (e.g., structured data gaps, missing comparison content, thin About/FAQ content) — not vague advice.
- A trend view showing GEO Score over time, alongside the existing social/website analytics so it reads as one more first-class metric, not a bolted-on report.
- Where a underlying model/provider cannot be queried programmatically or reliably, be explicit about that limitation in the UI (e.g., "estimated" vs. "verified" mentions) rather than presenting a number with false precision.

## 2. Social Commerce Hub

**Why:** Social commerce is projected at ~22% of all e-commerce by the end of 2026; none of AgentPost's baseline feature set touches it, and it's a fast-growing, global-reach driver (especially Southeast Asia and Latin America).

Build:
- Catalog sync for **TikTok Shop** and **Instagram/Facebook Shop**, so a Brand's product catalog is visible and manageable from AgentPost.
- Shoppable-post tooling in the Planner/composer: tag products directly on a scheduled post, per platform's supported format.
- A UGC-to-shoppable-post pipeline: surface user-generated content mentioning the brand (from the existing social listening/mentions data) and let a user turn it into a tagged, shoppable post with one action.
- Basic affiliate/creator-marketplace tracking: attribute sales or clicks back to specific creator partnerships where the underlying platform APIs expose that data.
- Commerce metrics (product clicks, catalog-driven conversions where available) integrated into the existing Analytics surface, not a separate silo.

## 3. Reputation & Review Management

**Why:** SOCi's core differentiator in the competitive analysis is automated review response and reputation monitoring for multi-location brands — a segment AgentPost's Google Business Profile connection (already built) is well positioned to extend into.

Build:
- Aggregated review monitoring for **Google Business Profile, Facebook, and Trustpilot** (or the closest available public APIs) per Brand.
- AI-assisted response drafting for incoming reviews, using the same approval-before-publish pattern already established for the AgentPost Agent's post drafts (Phase 1 Section 6.1) — never auto-post a review response without explicit approval.
- Sentiment and rating trend tracking over time, and alerts for new negative reviews needing a timely response.
- For multi-location Brands, a rollup view across locations, and a per-location drill-down.

## 4. Open Integration Marketplace

**Why:** Turns AgentPost from a tool into a platform with network effects — the Zapier-style model referenced in the original strategy analysis.

Build:
- A public-facing directory of available integrations and a basic developer-facing API/webhook system so third parties can build against AgentPost data (posts, analytics, Brand events).
- API key management scoped per Workspace (building on the Phase 2 Section 8 white-label API access), with clear scopes/permissions per key.
- A simple submission/review path for third-party integration listings, even if manually curated at first — the marketplace UI should not imply a fully automated self-serve pipeline unless it exists.
- Documentation pages for the API, written in the same plain, specific voice as the rest of the product — no generated-boilerplate API-reference tone.

## 5. AgentPost Academy

**Why:** Mirrors the organic-traffic and lead-generation engine that Buffer's and Hootsuite's own academies already run, and doubles as GEO-relevant content (Section 1).

Build:
- A free, structured course (multiple short lessons/modules) on social media management fundamentals, hosted on the marketing site.
- A completion/certificate mechanic tied to a user account (even a lightweight one) to support lead capture and social proof ("AgentPost Certified").
- Lesson content should be original, specific, and practical — real workflows and examples, not generic "10 tips for social media success" filler.
- Cross-link Academy content into the product itself where relevant (e.g., a contextual tip linking to the matching lesson from inside the Planner or Analytics screens).

## 6. In-Product Referral Program

**Why:** The fastest, cheapest global distribution channel available to a pre-revenue company, and explicitly called for in the original go-to-market strategy.

Build:
- A referral surface inside account/billing settings: a shareable referral link/code per user, referral status tracking (invited, signed up, converted to paid), and the specific reward mechanic (credit or revenue share) wired to real billing events from Phase 2.
- Clear, specific copy about what both sides get — no vague "earn rewards" language.
- Agency-specific framing where relevant: an agency referring a client Brand should see referral tracking at the Workspace level, not just the individual user level.

## 7. Native AI Creative Studio

**Why:** Several 2026 entrants use native creative generation as their core freemium hook; today AgentPost only integrates Canva, requiring users to leave the product for basic assets.

Build:
- In-app AI image generation for post assets (e.g., a prompt box in the post composer that generates on-brand images), with generated assets saved into the existing media/content library.
- Short-form AI video generation for at least one common format (e.g., a simple text/image-to-short-video flow suitable for Reels/TikTok/Shorts).
- Clear usage limits per plan tier, consistent with the existing plan/credit structure (the current plan already includes AI Assistant credits per brand/month — extend that same metering model to creative generation rather than inventing a separate system).
- Generated content should be editable afterward (crop, retext, recolor at a basic level) rather than a one-shot, non-editable output.

## 8. Definition of Done — self-check before reporting completion

- [ ] GEO Score is visible per Brand, trending over time, with at least one concrete, specific improvement action shown.
- [ ] A Brand's TikTok Shop or Instagram/Facebook Shop catalog is visible and a post can be tagged with a real product.
- [ ] A real incoming review (Google/Facebook/Trustpilot) can be seen, an AI-drafted response generated, and a human approval step required before it posts.
- [ ] An API key can be generated and used to read at least one real data type (e.g., scheduled posts or analytics) from outside the app.
- [ ] At least one Academy lesson is published and reachable from both the marketing site and a contextual in-app link.
- [ ] A referral link can be generated, shared, and its status (invited/signed up/converted) tracked against a real signup.
- [ ] A user can generate an AI image inside the post composer, have it saved to the content library, and use it in a real scheduled post.
- [ ] None of the above regressed the design system, copy rules, or any feature completed in Phase 1 or Phase 2.
- [ ] Report explicitly which of the above are NOT yet true, if any — do not report full completion unless every box is genuinely checked.
