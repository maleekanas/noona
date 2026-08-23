"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Check, Pencil } from "lucide-react";

type Post = Tables<"posts">;

const COLUMNS: { status: Post["status"]; label: string }[] = [
  { status: "draft", label: "Draft" },
  { status: "approved", label: "Approved" },
  { status: "published", label: "Published" },
];

export function Planner({ brandId }: { brandId: string }) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newContent, setNewContent] = useState("");
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data, error: fetchError } = await supabase
      .from("posts")
      .select("*")
      .eq("brand_id", brandId)
      .order("created_at", { ascending: false });
    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    setError(null);
    setPosts(data);
  }, [brandId]);

  useEffect(() => {
    setPosts(null);
    load();
  }, [load]);

  useEffect(() => {
    const handler = () => load();
    window.addEventListener("agentpost:posts-changed", handler);
    return () => window.removeEventListener("agentpost:posts-changed", handler);
  }, [load]);

  async function createDraft() {
    if (!newContent.trim()) return;
    setCreating(true);
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setCreating(false);
      return;
    }
    const { error: insertError } = await supabase.from("posts").insert({
      brand_id: brandId,
      content: newContent.trim(),
      created_by: userData.user.id,
    });
    setCreating(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setNewContent("");
    load();
  }

  async function updateStatus(post: Post, status: Post["status"]) {
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("posts")
      .update({ status })
      .eq("id", post.id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    load();
  }

  async function updateContent(post: Post, content: string) {
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("posts")
      .update({ content })
      .eq("id", post.id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    load();
  }

  async function remove(post: Post) {
    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from("posts")
      .delete()
      .eq("id", post.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    load();
  }

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-6">
        <h1 className="font-headline text-2xl font-semibold text-foreground">Planner</h1>
        <p className="text-sm text-foreground-muted">
          Draft, approve, and track posts for this brand.
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="space-y-3">
          <Textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write a new post…"
            rows={3}
          />
          <div className="flex justify-end">
            <Button onClick={createDraft} disabled={creating || !newContent.trim()}>
              {creating ? "Saving…" : "Add draft"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error ? <p className="mb-4 text-sm text-sentiment-negative">{error}</p> : null}

      {posts === null ? (
        <p className="text-sm text-foreground-muted">Loading…</p>
      ) : (
        <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto md:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.status} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                  {column.label}
                </h2>
                <span className="font-mono text-xs text-foreground-muted">
                  {posts.filter((p) => p.status === column.status).length}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {posts
                  .filter((p) => p.status === column.status)
                  .map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onApprove={() => updateStatus(post, "approved")}
                      onSaveContent={(content) => updateContent(post, content)}
                      onDelete={() => remove(post)}
                    />
                  ))}
                {posts.filter((p) => p.status === column.status).length === 0 ? (
                  <p className="text-xs text-foreground-muted">Nothing here yet.</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PostCard({
  post,
  onApprove,
  onSaveContent,
  onDelete,
}: {
  post: Post;
  onApprove: () => void;
  onSaveContent: (content: string) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(post.content);

  return (
    <Card>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant={post.status as "draft" | "approved" | "published"}>
            {post.status}
          </Badge>
          {post.source === "agent" ? (
            <Badge className="border-l-2 border-primary">agent draft</Badge>
          ) : null}
        </div>

        {editing ? (
          <>
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  onSaveContent(draft);
                  setEditing(false);
                }}
              >
                Save
              </Button>
            </div>
          </>
        ) : (
          <p className="whitespace-pre-wrap text-sm text-foreground">{post.content}</p>
        )}

        {!editing ? (
          <div className="flex items-center justify-end gap-1 pt-1">
            {post.status === "draft" ? (
              <Button variant="ghost" size="icon" title="Approve" onClick={onApprove}>
                <Check size={14} />
              </Button>
            ) : null}
            <Button variant="ghost" size="icon" title="Edit" onClick={() => setEditing(true)}>
              <Pencil size={14} />
            </Button>
            <Button variant="ghost" size="icon" title="Delete" onClick={onDelete}>
              <Trash2 size={14} />
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
