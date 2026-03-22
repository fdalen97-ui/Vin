"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { UtensilsCrossed, Wine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PairingSuggestion {
  dish: string;
  wines: { id: string; name: string; type: string }[];
}

export function FoodPairingSuggestion({
  suggestion,
}: {
  suggestion: PairingSuggestion | null;
}) {
  const t = useTranslations("dashboard.foodSuggestion");

  if (!suggestion) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <UtensilsCrossed className="h-4 w-4" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {t("recommend", { dish: suggestion.dish })}
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {suggestion.wines.map((wine) => (
            <Link
              key={wine.id}
              href={`/wines/${wine.id}`}
              className="flex-shrink-0 flex items-center gap-2 p-3 rounded-lg border hover:border-primary/50 hover:bg-accent transition-colors"
            >
              <Wine className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium whitespace-nowrap">
                {wine.name}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
