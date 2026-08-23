import Link from "next/link";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ confirmEmail?: string }>;
}) {
  const { confirmEmail } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link href="/" className="font-headline text-2xl font-semibold text-foreground">
            AgentPost
          </Link>
          <p className="mt-2 text-sm text-foreground-muted">
            Log in to your brands.
          </p>
        </div>

        {confirmEmail ? (
          <p className="rounded border border-border bg-surface-low p-3 text-sm text-foreground-muted">
            Check your email to confirm your account, then log in below.
          </p>
        ) : null}

        <LoginForm />

        <p className="text-center text-sm text-foreground-muted">
          No account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
