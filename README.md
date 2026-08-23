# AgentPost

AgentPost is the command center for planning, drafting, and tracking a brand's
social posts — with an AI agent that drafts real captions from a brand's own
recent posts, requiring explicit approval before anything counts.

This is **Milestone 1**: a real, working core product loop (auth, Brands,
Planner, AgentPost Agent). Social platform publishing, billing, and the
Phase 3 growth features (GEO Score, social commerce, reputation management,
integration marketplace, Academy, referral program, AI creative studio) are
future milestones — see `docs/` for the full build briefs.

## Stack

- Next.js 16 (App Router, TypeScript), Tailwind CSS v4
- Supabase (Postgres + Auth), row-level security scoping every table to a
  user's Brand memberships
- Anthropic API (`@anthropic-ai/sdk`, `claude-opus-5`) for the AgentPost Agent

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

Required environment variables (`.env.local`):

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase project settings → API (publishable/anon key — safe for the client) |
| `ANTHROPIC_API_KEY` | Required for the AgentPost Agent panel to draft posts; without it, that feature fails with a clear "not configured" error rather than pretending to work |

## Database

Schema and RLS policies are applied as Supabase migrations (via the Supabase
MCP tools, not a local migration folder in this milestone): `brands`,
`team_members`, `posts`. A new `brands` row automatically grants its creator
an `owner` row in `team_members` via a trigger; all three tables are scoped
by RLS so a query only ever sees rows for Brands the current user belongs to.

## A note on sandboxed/restricted-network dev environments

If you're running this behind an organization egress proxy that only allows
specific hosts (as this project was originally built in), Node's built-in
`fetch` does **not** read `HTTPS_PROXY` by default. Start the dev server with:

```bash
NODE_USE_ENV_PROXY=1 npm run dev
```

on Node ≥ 22.21, or the Supabase/Anthropic API calls will fail with generic
"fetch failed" errors even when the code is correct. If your Supabase
project's host isn't on your organization's egress allowlist at all, this
won't help — that's a network policy question for whoever manages the
allowlist, not a code issue.
