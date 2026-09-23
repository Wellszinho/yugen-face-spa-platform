import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  children,
  hint
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-yugen-ink">
      <span>{label}</span>
      {children}
      {hint ? <span className="text-xs font-normal text-yugen-muted">{hint}</span> : null}
    </label>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 rounded-2xl border border-yugen-moss/15 bg-yugen-oat/80 px-4 text-sm text-yugen-ink placeholder:text-yugen-muted/70 transition focus:border-yugen-ochre/55",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 rounded-[18px] border border-yugen-moss/15 bg-yugen-oat/80 px-4 py-3 text-sm text-yugen-ink placeholder:text-yugen-muted/70 transition focus:border-yugen-ochre/55",
        className
      )}
      {...props}
    />
  );
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 rounded-2xl border border-yugen-moss/15 bg-yugen-oat/80 px-4 text-sm text-yugen-ink transition focus:border-yugen-ochre/55",
        className
      )}
      {...props}
    />
  );
}
