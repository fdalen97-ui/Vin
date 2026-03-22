"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Wine, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Wine className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">{t("common.appName")}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/wines"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.wines")}
          </Link>
          <Link
            href="/cellar"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.cellar")}
          </Link>
          <Link
            href="/scan"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.scan")}
          </Link>
          <Link
            href="/pairing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("nav.pairing")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/login">
            <Button variant="ghost" size="sm">
              {t("common.login")}
            </Button>
          </Link>
          <Link href="/register" className="hidden sm:block">
            <Button size="sm">{t("common.register")}</Button>
          </Link>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 w-10 hover:bg-accent hover:text-accent-foreground cursor-pointer">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/wines"
                  className="text-lg font-medium hover:text-primary"
                >
                  {t("nav.wines")}
                </Link>
                <Link
                  href="/cellar"
                  className="text-lg font-medium hover:text-primary"
                >
                  {t("nav.cellar")}
                </Link>
                <Link
                  href="/scan"
                  className="text-lg font-medium hover:text-primary"
                >
                  {t("nav.scan")}
                </Link>
                <Link
                  href="/pairing"
                  className="text-lg font-medium hover:text-primary"
                >
                  {t("nav.pairing")}
                </Link>
                <Link
                  href="/profile"
                  className="text-lg font-medium hover:text-primary"
                >
                  {t("nav.profile")}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
