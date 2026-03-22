"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Wine,
  Archive,
  Camera,
  UtensilsCrossed,
  User,
  Rss,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, labelKey: "nav.dashboard" },
  { href: "/wines", icon: Wine, labelKey: "nav.wines" },
  { href: "/cellar", icon: Archive, labelKey: "nav.cellar" },
  { href: "/scan", icon: Camera, labelKey: "nav.scan" },
  { href: "/pairing", icon: UtensilsCrossed, labelKey: "nav.pairing" },
  { href: "/restaurants", icon: MapPin, labelKey: "nav.restaurants" },
  { href: "/feed", icon: Rss, labelKey: "nav.feed" },
  { href: "/profile", icon: User, labelKey: "nav.profile" },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r bg-sidebar">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo */}
        <div className="flex items-center gap-2 h-16 px-6 border-b">
          <Wine className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">{t("common.appName")}</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-6 py-4 border-t">
          <LanguageSwitcher />
        </div>
      </div>
    </aside>
  );
}
