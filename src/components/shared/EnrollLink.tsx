"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToEnrollSection } from "@/lib/enroll-navigation";

interface EnrollLinkProps extends Omit<React.ComponentProps<typeof Link>, "href"> {
  href?: React.ComponentProps<typeof Link>["href"];
  packageId?: string;
}

export function EnrollLink({
  packageId,
  href,
  onClick,
  scroll = false,
  ...props
}: EnrollLinkProps) {
  const pathname = usePathname();
  const enrollHref = packageId ? `/?package=${packageId}#enroll` : "/#enroll";

  return (
    <Link
      href={href ?? enrollHref}
      scroll={scroll}
      onClick={(e) => {
        onClick?.(e);
        if (pathname === "/" && !e.defaultPrevented) {
          e.preventDefault();
          scrollToEnrollSection(packageId);
        }
      }}
      {...props}
    />
  );
}
