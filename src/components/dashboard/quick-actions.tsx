"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Camera, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  const t = useTranslations("dashboard.quickActions");

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 flex flex-col gap-2 z-40">
      <Link href="/scan">
        <Button size="lg" className="rounded-full shadow-lg gap-2">
          <Camera className="h-4 w-4" />
          <span className="hidden sm:inline">{t("scan")}</span>
        </Button>
      </Link>
      <Link href="/cellar">
        <Button
          size="lg"
          variant="secondary"
          className="rounded-full shadow-lg gap-2"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">{t("addToCellar")}</span>
        </Button>
      </Link>
    </div>
  );
}
