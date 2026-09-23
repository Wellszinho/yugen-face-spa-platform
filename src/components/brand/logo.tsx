import { cn } from "@/lib/utils";

const logoSizes = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
  xl: "h-20 w-20"
};

type LogoSize = keyof typeof logoSizes;

export function BrandLogo({
  size = "md",
  className
}: {
  size?: LogoSize;
  className?: string;
}) {
  return (
    <span className={cn("brand-logo", logoSizes[size], className)} aria-hidden="true">
      <img src="/brand/yugen-face-logo.png" alt="" loading="eager" decoding="async" />
    </span>
  );
}

export function BrandLockup({
  size = "md",
  title = "Yugen",
  subtitle = "Face Spa",
  className,
  titleClassName,
  subtitleClassName
}: {
  size?: LogoSize;
  title?: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BrandLogo size={size} />
      <div>
        <p className={cn("font-serif text-lg leading-5 text-yugen-ink", titleClassName)}>{title}</p>
        <p className={cn("text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-yugen-moss", subtitleClassName)}>{subtitle}</p>
      </div>
    </div>
  );
}
