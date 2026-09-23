import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-yugen-moss text-yugen-oat shadow-[0_12px_24px_rgba(104,116,65,0.16)] hover:bg-yugen-ink",
  secondary: "border border-yugen-clay/90 bg-yugen-oat/64 text-yugen-ink hover:border-yugen-ochre/50 hover:bg-yugen-oat",
  ghost: "text-yugen-ink hover:bg-yugen-sage/68",
  danger: "bg-yugen-terracotta text-yugen-oat hover:bg-yugen-ink"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
  icon: "h-9 w-9 p-0"
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-300 disabled:cursor-not-allowed disabled:opacity-55",
    variants[variant],
    sizes[size],
    className
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <button type={type} className={buttonClassName({ variant, size, className })} {...props} />;
}
