import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="font-headline text-xl font-bold text-foreground">
          AgentPost
        </span>
        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-foreground-muted hover:text-foreground"
          >
            Log in
          </Link>
          <Link href="/sign-up">
            <Button size="sm">Start free</Button>
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <h1 className="font-headline text-4xl font-semibold leading-tight text-foreground lg:text-5xl">
            Plan a month of posts. Let the Agent draft them. Approve what&apos;s
            good.
          </h1>
          <p className="mt-5 text-lg text-foreground-muted">
            AgentPost is where a solo creator or small team plans, drafts, and
            tracks their brand&apos;s posts — with an agent that actually
            writes the first draft from your own recent posts, not a chatbot
            bolted onto a scheduler.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link href="/sign-up">
              <Button size="lg">Start free</Button>
            </Link>
            <span className="text-sm text-foreground-muted">
              No credit card required
            </span>
          </div>
        </div>

        <DashboardPreview />
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-surface-lowest py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-headline text-2xl font-semibold text-foreground">
            How it works
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Step
              n="1"
              title="Create a Brand"
              body="One container for one business or client. Everything you plan and track for it lives in one place."
            />
            <Step
              n="2"
              title="Ask the Agent to draft"
              body="It reads your brand's recent posts for tone, then writes real caption options — not generic filler."
            />
            <Step
              n="3"
              title="Approve, edit, or reject"
              body="Nothing gets added to your Planner until you say so. Edit any draft before it counts."
            />
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Outcome
            title="Never start from a blank page"
            body="The Agent proposes real drafts in your brand's own voice, so you're editing instead of staring at an empty box."
          />
          <Outcome
            title="One board for every status"
            body="Draft, approved, and published posts live on one Planner board — no separate spreadsheet to keep in sync."
          />
          <Outcome
            title="Your voice, not a template"
            body="Drafts are grounded in what your brand has already posted, not a one-size-fits-all caption formula."
          />
        </div>
      </section>

      {/* Pricing preview */}
      <section className="border-t border-border bg-surface-lowest py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-headline text-2xl font-semibold text-foreground">
            Free while AgentPost is in early access
          </h2>
          <p className="mt-3 text-foreground-muted">
            Create a brand, use the Planner, and draft with the Agent — no
            credit card, no trial countdown.
          </p>
          <ul className="mx-auto mt-6 inline-block space-y-2 text-left">
            {[
              "Unlimited draft, approved, and published posts",
              "AgentPost Agent drafting for your brand's voice",
              "One board to track everything",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                <Check size={16} className="text-sentiment-positive" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/sign-up">
              <Button size="lg">Start free</Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-6 text-sm text-foreground-muted">
          AgentPost
        </div>
      </footer>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div>
      <span className="font-mono text-xs text-primary">{n.padStart(2, "0")}</span>
      <h3 className="mt-1 font-headline text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm text-foreground-muted">{body}</p>
    </div>
  );
}

function Outcome({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded border border-border bg-surface p-5">
      <h3 className="font-headline text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-foreground-muted">{body}</p>
    </div>
  );
}

/** A real representation of the product's three-pane layout, built from the
 * same design tokens as the app — not a stock illustration or abstract
 * gradient shape. */
function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded border border-border bg-surface shadow-[0px_4px_12px_rgba(0,0,0,0.5)]">
      <div className="flex">
        <div className="flex w-12 flex-col items-center gap-2 border-r border-border bg-background-deep py-3">
          <div className="h-6 w-6 rounded bg-primary" />
          <div className="h-6 w-6 rounded bg-secondary/60" />
          <div className="h-6 w-6 rounded border border-dashed border-outline" />
        </div>
        <div className="flex-1 space-y-2 p-4">
          <p className="font-mono text-[10px] uppercase tracking-wide text-foreground-muted">
            Planner — Draft
          </p>
          <div className="space-y-2">
            {[
              "Riverside Coffee Co. opens for the holidays Nov 24 with...",
              "Behind the scenes: how we source our winter blend.",
            ].map((text) => (
              <div key={text} className="rounded border border-border bg-surface-low p-2">
                <Badge variant="draft" className="mb-1">
                  draft
                </Badge>
                <p className="line-clamp-2 text-xs text-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden w-32 flex-col gap-2 border-l border-border bg-surface-low p-3 sm:flex">
          <div className="flex items-center gap-1">
            <Sparkles size={12} className="text-primary" />
            <p className="font-mono text-[10px] text-foreground-muted">agent</p>
          </div>
          <div className="rounded border-l-2 border-primary bg-surface p-2">
            <p className="text-[10px] text-foreground-muted">
              drafted 3 options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
