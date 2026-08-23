import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BrandRail } from "./brand-rail";
import { AgentPanel } from "./agent-panel";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: brands } = await supabase
    .from("brands")
    .select("id, name")
    .order("created_at", { ascending: true });

  return (
    <div className="flex h-screen bg-background">
      <BrandRail brands={brands ?? []} />
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      <AgentPanel brands={brands ?? []} />
    </div>
  );
}
