# AgentPost — Platform Credentials Checklist

What to gather so real OAuth and billing can actually be tested. Based on the environment variables the current backend code reads directly (`artifacts/api-server/src/lib/socialPlatforms.ts`, `artifacts/api-server/src/routes/billing.ts`).

Set all of these as Replit **Secrets** (never commit them to the repo or a docx/markdown file).

---

## Already required by the live code

### Meta (Instagram + recommended: Facebook next)
- **Where:** developers.facebook.com → create a Business app → Facebook Login + Instagram Graph API products.
- **Need:** `META_APP_ID`, `META_APP_SECRET`
- **Redirect URI to register:** the value you set for `SOCIAL_OAUTH_REDIRECT_URI` below, exactly.
- **Scopes already requested by the code:** `instagram_basic`, `instagram_content_publish`, `pages_show_list`, `pages_read_engagement`.
- **Heads-up:** `instagram_content_publish` requires Meta **App Review** before it works for anyone other than accounts added as Testers/Admins in the Meta App dashboard. Add your own test accounts as Testers first so you can verify the flow before Review is approved — Review can take days.
- **Also required:** the Instagram account must be a Business/Creator account linked to a Facebook Page, and the person connecting must be an admin of that Page.

### LinkedIn
- **Where:** developer.linkedin.com → create an app → request the "Share on LinkedIn" / Community Management API product.
- **Need:** `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`
- **Redirect URI:** same `SOCIAL_OAUTH_REDIRECT_URI`, registered in the LinkedIn app's Auth settings.
- **Scopes requested by the code:** `openid profile w_member_social`.
- **Heads-up:** `w_member_social` in production requires LinkedIn to verify the app; personal-profile posting only (no Company Pages yet in the current code).

### X (Twitter)
- **Where:** developer.x.com → create a project + app with OAuth 2.0 enabled.
- **Need:** `X_CLIENT_ID`, `X_CLIENT_SECRET` (secret is optional — code supports public-client PKCE-only if you skip it, but a confidential client is more reliable).
- **Redirect URI:** same `SOCIAL_OAUTH_REDIRECT_URI`, registered in the X app's User authentication settings.
- **Scopes requested:** `tweet.read tweet.write users.read offline.access`.
- **Heads-up:** X's free API tier has posting limits; check your access tier covers your expected volume.

### Shared OAuth config (all platforms)
- `SOCIAL_OAUTH_REDIRECT_URI` — one callback URL for all platforms, pointing at `<your-app-url>/connections/oauth/callback`. Must be added to **every** platform app above, identically.
- `SOCIAL_TOKEN_ENCRYPTION_KEY` (or it falls back to `SESSION_SECRET` if unset) — any long random string; used to encrypt stored access/refresh tokens at rest. Generate once, keep stable (rotating it invalidates all stored tokens and forces reconnection).

### Billing (Stripe)
- **Where:** your Stripe Dashboard (test mode first, then live).
- **Need:** `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID` (the recurring price for the paid plan), `STRIPE_WEBHOOK_SECRET` (from the webhook endpoint you register pointing at `<your-app-url>/billing/webhook`).
- **Heads-up:** register the webhook endpoint in Stripe listening for at least `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted` — the code only handles those event types.

---

## Needed once each new platform is actually built (not yet read by any code)

| Platform | What to start gathering |
|---|---|
| Facebook (Page posting) | Reuses `META_APP_ID`/`META_APP_SECRET` above — no new credential, just new scopes (`pages_manage_posts`) once the code is extended. |
| Google Business Profile / YouTube | Google Cloud Console → OAuth client (Web application) → `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`; enable the Business Profile API and/or YouTube Data API v3 on the project. |
| TikTok | developers.tiktok.com → register an app → `TIKTOK_CLIENT_KEY` / `TIKTOK_CLIENT_SECRET`; video publishing requires TikTok's app audit/approval. |
| WhatsApp Business | Meta Business Manager → WhatsApp Business Platform → phone number + permanent access token via a System User (different flow than the consumer OAuth above). |
| Telegram | No OAuth — create a bot via @BotFather, get a bot token, and the brand's channel/group must add the bot as an admin. |
| Discord | discord.com/developers → create an application → bot token + OAuth2 client ID/secret for server installs. |

---

## Practical order to actually do this

1. Set up `SOCIAL_OAUTH_REDIRECT_URI` and `SOCIAL_TOKEN_ENCRYPTION_KEY` first — everything else depends on the redirect URI being fixed and registered everywhere.
2. Register the Meta, LinkedIn, and X developer apps in parallel — they're independent and each takes review/approval time, so starting all three now shortens the critical path.
3. Add yourself as a Meta App Tester immediately so Instagram can be verified before App Review completes.
4. Set up Stripe in test mode and verify the full checkout → webhook → subscription flow before touching live keys.
5. Only after 1–3 are verified working end-to-end, start on Facebook/GBP/YouTube per the priority order above.
