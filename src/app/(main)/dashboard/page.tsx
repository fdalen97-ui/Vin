"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { CellarDistribution } from "@/components/dashboard/cellar-distribution";
import { DrinkSoonList } from "@/components/dashboard/drink-soon-list";
import { VinmonopoletNew } from "@/components/dashboard/vinmonopolet-new";
import { FoodPairingSuggestion } from "@/components/dashboard/food-pairing-suggestion";
import { CellarValue } from "@/components/dashboard/cellar-value";
import { TopWines } from "@/components/dashboard/top-wines";
import { QuickActions } from "@/components/dashboard/quick-actions";

interface DashboardData {
  totalBottles: number;
  totalReviews: number;
  avgRating: number;
  lastTasted: string | null;
  cellarValue: number;
  distribution: { type: string; count: number; percentage: number }[];
  drinkSoon: { id: string; wineName: string; vintage: number | null; drinkBefore: string; status: "optimal" | "soon" | "urgent" }[];
  topWines: { id: string; name: string; vintage: number | null; rating: number }[];
}

interface VinProduct {
  id: string;
  name: string;
  producer: string;
  price: number;
  type: string;
  country: string;
}

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const [data, setData] = useState<DashboardData | null>(null);
  const [vinProducts, setVinProducts] = useState<VinProduct[]>([]);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);

    // Get some wines as "new from Vinmonopolet" (simulated)
    fetch("/api/wines?limit=4")
      .then((res) => res.json())
      .then((res) => {
        setVinProducts(
          res.wines.map((w: { id: string; name: string; producer: string; price: number; type: string; country: string }) => ({
            id: w.id,
            name: w.name,
            producer: w.producer,
            price: w.price ?? 0,
            type: w.type,
            country: w.country,
          }))
        );
      })
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">{t("welcome")}...</p>
      </div>
    );
  }

  // Pick a food suggestion from pairings
  const suggestions = [
    { dish: "laks", wines: [{ id: "1", name: "Chablis", type: "WHITE" }, { id: "2", name: "Sancerre", type: "WHITE" }] },
    { dish: "biff", wines: [{ id: "3", name: "Barolo", type: "RED" }, { id: "4", name: "Châteauneuf-du-Pape", type: "RED" }] },
    { dish: "pasta", wines: [{ id: "5", name: "Tignanello", type: "RED" }, { id: "6", name: "Valpolicella", type: "RED" }] },
  ];
  const todaySuggestion = suggestions[new Date().getDay() % suggestions.length];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("welcome")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <StatsCards
        totalBottles={data.totalBottles}
        totalReviews={data.totalReviews}
        avgRating={data.avgRating}
        lastTasted={data.lastTasted}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <CellarDistribution data={data.distribution} />
          <DrinkSoonList items={data.drinkSoon} />
          <CellarValue totalValue={data.cellarValue} changePercent={12} />
        </div>

        <div className="space-y-6">
          <VinmonopoletNew products={vinProducts} />
          <FoodPairingSuggestion suggestion={todaySuggestion} />
          <TopWines wines={data.topWines} />
        </div>
      </div>

      <QuickActions />
    </div>
  );
}
