"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { brandColor, brandInitials, type BrandSummary } from "@/lib/brands";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/login/actions";

export function BrandRail({ brands }: { brands: BrandSummary[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeBrand = searchParams.get("brand");
  const [creating, setCreating] = useState(false);
  const [pending, startTransition] = useTransition();

  async function handleCreate() {
    const name = window.prompt("New brand name");
    if (!name || !name.trim()) return;
    setCreating(true);
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { data, error } = await supabase
      .from("brands")
      .insert({ name: name.trim(), owner_id: userData.user.id })
      .select("id")
      .single();
    setCreating(false);
    if (error) {
      window.alert(error.message);
      return;
    }
    startTransition(() => {
      router.push(`/dashboard?brand=${data.id}`);
      router.refresh();
    });
  }

  return (
    <nav
      aria-label="Brands"
      className="flex w-16 shrink-0 flex-col items-center gap-3 border-r border-border bg-background-deep py-4"
    >
      <Link
        href="/"
        className="mb-2 font-headline text-lg font-bold text-primary"
        title="AgentPost"
      >
        AP
      </Link>

      {brands.map((brand) => {
        const active = brand.id === activeBrand;
        return (
          <Link
            key={brand.id}
            href={`/dashboard?brand=${brand.id}`}
            title={brand.name}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded font-mono text-xs font-semibold text-white ring-2 ring-offset-2 ring-offset-background-deep transition",
              active ? "ring-primary" : "ring-transparent hover:ring-outline",
            )}
            style={{ backgroundColor: brandColor(brand.id) }}
          >
            {brandInitials(brand.name)}
          </Link>
        );
      })}

      <button
        onClick={handleCreate}
        disabled={creating || pending}
        title="New brand"
        className="flex h-9 w-9 items-center justify-center rounded border border-dashed border-outline text-foreground-muted hover:border-primary hover:text-primary disabled:opacity-50"
      >
        <Plus size={16} />
      </button>

      <div className="flex-1" />

      <form action={signOut}>
        <button
          type="submit"
          title="Log out"
          className="flex h-9 w-9 items-center justify-center rounded text-foreground-muted hover:bg-surface-high hover:text-foreground"
        >
          <LogOut size={16} />
        </button>
      </form>
    </nav>
  );
}
