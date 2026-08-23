import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { brandId?: string } | null;
  const brandId = body?.brandId;
  if (!brandId) {
    return NextResponse.json({ error: "brandId is required." }, { status: 400 });
  }

  // RLS scopes this to brands the user is a member of — a non-member or
  // nonexistent brand returns no row, and we treat both the same way.
  const { data: brand, error: brandError } = await supabase
    .from("brands")
    .select("id, name")
    .eq("id", brandId)
    .maybeSingle();

  if (brandError || !brand) {
    return NextResponse.json({ error: "Brand not found." }, { status: 404 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The AgentPost Agent isn't configured yet. Add ANTHROPIC_API_KEY to the environment." },
      { status: 503 },
    );
  }

  const { data: recentPosts } = await supabase
    .from("posts")
    .select("content")
    .eq("brand_id", brandId)
    .order("created_at", { ascending: false })
    .limit(5);

  const client = new Anthropic({ apiKey });

  let response;
  try {
    response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      output_config: { effort: "medium" },
      system:
        "You draft short social media post captions for a specific brand. " +
        "Write concrete, specific, human-sounding copy — no generic marketing " +
        "filler, no hashtag spam, no emoji unless the brand's own recent posts " +
        "use them. Respond with ONLY a JSON array of exactly 3 distinct caption " +
        "strings, no other text, no markdown code fence.",
      messages: [
        {
          role: "user",
          content:
            `Brand: ${brand.name}\n` +
            (recentPosts && recentPosts.length > 0
              ? `Recent posts from this brand, for voice/tone reference:\n${recentPosts
                  .map((p) => `- ${p.content}`)
                  .join("\n")}\n\n`
              : "") +
            "Draft 3 caption options for the next post.",
        },
      ],
    });
  } catch (err) {
    const message = err instanceof Anthropic.APIError ? err.message : "The Agent request failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
  if (!textBlock) {
    return NextResponse.json({ error: "The Agent didn't return any drafts." }, { status: 502 });
  }

  let drafts: unknown;
  try {
    drafts = JSON.parse(textBlock.text);
  } catch {
    return NextResponse.json(
      { error: "The Agent's response couldn't be read as draft options." },
      { status: 502 },
    );
  }

  if (!Array.isArray(drafts) || !drafts.every((d) => typeof d === "string")) {
    return NextResponse.json(
      { error: "The Agent's response wasn't in the expected format." },
      { status: 502 },
    );
  }

  return NextResponse.json({ drafts });
}
