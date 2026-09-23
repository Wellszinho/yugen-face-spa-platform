import { Loader2, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingState({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="grid min-h-64 place-items-center text-yugen-muted">
      <div className="flex items-center gap-3 rounded-full border border-yugen-moss/15 bg-yugen-oat/75 px-4 py-3 text-sm">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        <span>{label}</span>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  className
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid place-items-center rounded-[20px] border border-dashed border-yugen-moss/20 bg-yugen-oat/60 p-8 text-center", className)}>
      <SearchX className="mb-3 h-7 w-7 text-yugen-moss" aria-hidden="true" />
      <h3 className="font-serif text-xl text-yugen-ink">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm leading-6 text-yugen-muted">{description}</p> : null}
    </div>
  );
}

export function InlineAlert({
  tone = "success",
  children
}: {
  tone?: "success" | "error";
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm",
        tone === "success"
          ? "border-yugen-moss/15 bg-yugen-sage/60 text-yugen-ink"
          : "border-yugen-terracotta/25 bg-yugen-terracotta/10 text-yugen-ink"
      )}
    >
      {children}
    </p>
  );
}
