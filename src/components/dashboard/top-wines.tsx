"use client";

import { useTranslations } from "next-intl";
import { Star, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TopWine {
  id: string;
  name: string;
  vintage: number | null;
  rating: number;
}

export function TopWines({ wines }: { wines: TopWine[] }) {
  const t = useTranslations("dashboard.topWines");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Trophy className="h-4 w-4" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {wines.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Ingen anmeldelser enda.
          </p>
        ) : (
          <div className="space-y-3">
            {wines.map((wine, i) => (
              <div key={wine.id} className="flex items-center gap-3">
                <span className="text-lg font-bold text-muted-foreground w-6">
                  {i + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {wine.name}{" "}
                    {wine.vintage && (
                      <span className="text-muted-foreground">
                        {wine.vintage}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold">
                    {wine.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
