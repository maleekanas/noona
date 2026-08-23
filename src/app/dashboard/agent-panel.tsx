"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { BrandSummary } from "@/lib/brands";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";

type Draft = { id: string; content: string };

export function AgentPanel({ brands }: { brands: BrandSummary[] }) {
  const searchParams = useSearchParams();
  const brandId = searchParams.get("brand");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);

  if (brands.length === 0 || !brandId) return null;

  async function requestDrafts() {
    setLoading(true);
    setError(null);
    setLog((l) => [...l, "researching recent posts for voice/tone…"]);

    const res = await fetch("/api/agent/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brandId }),
    });
    const body = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(body.error ?? "The Agent request failed.");
      setLog((l) => [...l, `failed: ${body.error ?? "unknown error"}`]);
      return;
    }

    setDrafts(
      (body.drafts as string[]).map((content, i) => ({
        id: `${Date.now()}-${i}`,
        content,
      })),
    );
    setLog((l) => [...l, `drafted ${body.drafts.length} options`]);
  }

  async function approve(draft: Draft) {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user || !brandId) return;
    const { error: insertError } = await supabase.from("posts").insert({
      brand_id: brandId,
      content: draft.content,
      status: "approved",
      source: "agent",
      created_by: userData.user.id,
    });
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setDrafts((d) => d.filter((x) => x.id !== draft.id));
    setLog((l) => [...l, "approved a draft → added to Planner"]);
    // Planner polls its own data on mount; a full reload keeps this milestone
    // simple rather than wiring cross-component realtime state.
    window.dispatchEvent(new CustomEvent("agentpost:posts-changed"));
  }

  function reject(draftId: string) {
    setDrafts((d) => d.filter((x) => x.id !== draftId));
    setLog((l) => [...l, "rejected a draft"]);
  }

  function updateDraft(draftId: string, content: string) {
    setDrafts((d) => d.map((x) => (x.id === draftId ? { ...x, content } : x)));
  }

  return (
    <aside className="hidden w-agent-panel shrink-0 flex-col border-l border-border bg-surface-low lg:flex">
      <div className="flex items-center gap-2 border-b border-border p-4">
        <Sparkles size={16} className="text-primary" />
        <h2 className="font-headline text-sm font-semibold text-foreground">
          AgentPost Agent
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Button onClick={requestDrafts} disabled={loading} className="w-full">
          {loading ? "Drafting…" : "Draft posts for this brand"}
        </Button>

        {error ? <p className="mt-3 text-sm text-sentiment-negative">{error}</p> : null}

        {log.length > 0 ? (
          <div className="mt-3 space-y-1 rounded border border-border bg-surface p-2">
            {log.slice(-5).map((line, i) => (
              <p key={i} className="font-mono text-[11px] text-foreground-muted">
                {line}
              </p>
            ))}
          </div>
        ) : null}

        <div className="mt-4 space-y-3">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="rounded border border-l-2 border-border border-l-primary bg-surface p-3"
            >
              <Textarea
                value={draft.content}
                onChange={(e) => updateDraft(draft.id, e.target.value)}
                rows={4}
                className="mb-2"
              />
              <div className="flex justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  title="Reject"
                  onClick={() => reject(draft.id)}
                >
                  <X size={14} />
                </Button>
                <Button
                  variant="primary"
                  size="icon"
                  title="Approve"
                  onClick={() => approve(draft)}
                >
                  <Check size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
