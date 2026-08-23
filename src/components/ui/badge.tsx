import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-surface-high text-foreground-muted",
        draft: "bg-surface-high text-foreground-muted",
        approved: "bg-primary/15 text-primary",
        published: "bg-sentiment-positive/15 text-sentiment-positive",
        failed: "bg-sentiment-negative/15 text-sentiment-negative",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
