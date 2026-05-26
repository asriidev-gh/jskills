import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE_LOGO, SITE_LOGO_ALT } from "@/lib/site";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  showText?: boolean;
  href?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { width: 160, height: 52, className: "h-12 w-auto" },
  md: { width: 220, height: 72, className: "h-14 w-auto sm:h-16" },
  lg: { width: 280, height: 90, className: "h-[4.5rem] w-auto sm:h-20" },
};

export function Logo({
  className,
  imageClassName,
  showText = false,
  href = "/",
  size = "md",
}: LogoProps) {
  const { width, height, className: sizeClass } = sizes[size];

  const content = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src={SITE_LOGO}
        alt={SITE_LOGO_ALT}
        width={width}
        height={height}
        className={cn(
          "object-contain object-left",
          sizeClass,
          imageClassName
        )}
        priority
      />
      {showText && (
        <span className="font-display text-lg font-black uppercase tracking-tight text-white sm:text-xl">
          J<span className="text-accent-orange">Skills</span>
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="group block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
