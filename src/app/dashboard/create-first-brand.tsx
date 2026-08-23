"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CreateFirstBrand() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setPending(true);
    setError(null);

    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setError("Your session expired. Refresh and log in again.");
      setPending(false);
      return;
    }

    const { data, error: insertError } = await supabase
      .from("brands")
      .insert({ name: name.trim(), owner_id: userData.user.id })
      .select("id")
      .single();

    setPending(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    router.push(`/dashboard?brand=${data.id}`);
    router.refresh();
  }

  return (
    <div className="flex h-full items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your first brand</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-foreground-muted">
            A Brand is the container for one business or client — everything
            you plan, draft, and track lives inside one.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="brand-name">Brand name</Label>
              <Input
                id="brand-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Riverside Coffee Co."
                autoFocus
              />
            </div>
            {error ? <p className="text-sm text-sentiment-negative">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={pending || !name.trim()}>
              {pending ? "Creating…" : "Create brand"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
