import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CreateFirstBrand } from "./create-first-brand";
import { Planner } from "./planner";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand } = await searchParams;
  const supabase = await createClient();

  const { data: brands } = await supabase
    .from("brands")
    .select("id, name")
    .order("created_at", { ascending: true });

  if (!brands || brands.length === 0) {
    return <CreateFirstBrand />;
  }

  const activeBrandId = brand && brands.some((b) => b.id === brand) ? brand : brands[0].id;

  if (activeBrandId !== brand) {
    redirect(`/dashboard?brand=${activeBrandId}`);
  }

  return <Planner brandId={activeBrandId} />;
}
