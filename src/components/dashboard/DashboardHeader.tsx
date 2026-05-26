"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { DASHBOARD_LOGO } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinkBase =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all whitespace-nowrap";

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const links = [
    { href: "/dashboard/insights", label: "Insights" },
    { href: "/dashboard/registrants", label: "Registrants" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/90 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2">
            <Logo href="/dashboard/insights" size="sm" src={DASHBOARD_LOGO} />
            <span className="text-sm font-semibold text-gray-500">Admin</span>
          </div>
          <nav
            className="flex flex-wrap items-center gap-1 self-stretch rounded-xl border border-gray-200/80 bg-gray-100/90 p-1 sm:self-auto"
            aria-label="Dashboard"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  navLinkBase,
                  pathname === link.href
                    ? "bg-white text-orange-700 shadow-sm ring-1 ring-gray-200/90"
                    : "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="inline-flex shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400 hover:bg-gray-50"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
