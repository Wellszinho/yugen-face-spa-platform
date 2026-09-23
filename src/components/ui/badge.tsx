import { cn } from "@/lib/utils";

const toneMap = {
  live: "border-yugen-terracotta/24 bg-yugen-oat/82 text-yugen-ink",
  upcoming: "border-yugen-ochre/32 bg-yugen-ochre/10 text-yugen-ink",
  closed: "border-yugen-clay bg-yugen-sage/64 text-yugen-ink",
  neutral: "border-yugen-clay/90 bg-yugen-oat/70 text-yugen-muted"
};

export function Badge({
  children,
  tone = "neutral",
  className
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneMap;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em]", toneMap[tone], className)}>
      {children}
    </span>
  );
}
