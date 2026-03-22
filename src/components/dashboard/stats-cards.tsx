"use client";

import { useTranslations } from "next-intl";
import { Archive, Star, Wine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  totalBottles: number;
  totalReviews: number;
  avgRating: number;
  lastTasted: string | null;
}

export function StatsCards({
  totalBottles,
  totalReviews,
  avgRating,
  lastTasted,
}: StatsCardsProps) {
  const t = useTranslations("dashboard.stats");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent className="flex items-center gap-4 pt-6">
          <div className="rounded-lg bg-primary/10 p-3">
            <Archive className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("cellar")}</p>
            <p className="text-2xl font-bold">
              {totalBottles}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                {t("bottles")}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 pt-6">
          <div className="rounded-lg bg-amber-500/10 p-3">
            <Star className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("reviews")}</p>
            <p className="text-2xl font-bold">
              {totalReviews}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                {t("avgRating")}: {avgRating.toFixed(1)}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 pt-6">
          <div className="rounded-lg bg-rose-500/10 p-3">
            <Wine className="h-5 w-5 text-rose-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("lastTasted")}</p>
            <p className="text-lg font-semibold truncate">
              {lastTasted || "—"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
