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
  drinkSoon: {
    id: string;
    wineName: string;
    vintage: number | null;
    drinkBefore: string;
    status: "optimal" | "soon" | "urgent";
  }[];
  topWines: {
    id: string;
    name: string;
    vintage: number | null;
    rating: number;
  }[];
}

interface VinProduct {
  id: string;
  name: string;
  producer: string;
  price: number;
  type: string;
  country: string;
}

const demoDashboard: DashboardData = {
  totalBottles: 47,
  totalReviews: 23,
  avgRating: 4.2,
  lastTasted: "Barolo Riserva 2019",
  cellarValue: 34500,
  distribution: [
    { type: "RED", count: 32, percentage: 68 },
    { type: "WHITE", count: 10, percentage: 22 },
    { type: "SPARKLING", count: 3, percentage: 8 },
    { type: "ROSE", count: 2, percentage: 2 },
  ],
  drinkSoon: [
    {
      id: "ds1",
      wineName: "Chablis Premier Cru",
      vintage: 2020,
      drinkBefore: new Date(
        Date.now() + 5 * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      status: "soon",
    },
    {
      id: "ds2",
      wineName: "Rioja Reserva",
      vintage: 2017,
      drinkBefore: new Date(
        Date.now() + 1 * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      status: "optimal",
    },
    {
      id: "ds3",
      wineName: "Sancerre",
      vintage: 2019,
      drinkBefore: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: "urgent",
    },
  ],
  topWines: [
    { id: "tw1", name: "Barolo Riserva", vintage: 2016, rating: 4.8 },
    {
      id: "tw2",
      name: "Châteauneuf-du-Pape",
      vintage: 2018,
      rating: 4.7,
    },
    { id: "tw3", name: "Amarone della Valpolicella", vintage: 2017, rating: 4.5 },
    { id: "tw4", name: "Brunello di Montalcino", vintage: 2016, rating: 4.4 },
    { id: "tw5", name: "Tignanello", vintage: 2019, rating: 4.3 },
  ],
};

const demoVinProducts: VinProduct[] = [
  {
    id: "vp1",
    name: "Cloudy Bay Sauvignon Blanc",
    producer: "Cloudy Bay",
    price: 249,
    type: "WHITE",
    country: "New Zealand",
  },
  {
    id: "vp2",
    name: "Barolo DOCG",
    producer: "Pio Cesare",
    price: 459,
    type: "RED",
    country: "Italia",
  },
  {
    id: "vp3",
    name: "Moët & Chandon Impérial",
    producer: "Moët & Chandon",
    price: 549,
    type: "SPARKLING",
    country: "Frankrike",
  },
  {
    id: "vp4",
    name: "Whispering Angel Rosé",
    producer: "Château d'Esclans",
    price: 219,
    type: "ROSE",
    country: "Frankrike",
  },
];

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const [data, setData] = useState<DashboardData>(demoDashboard);
  const [vinProducts, setVinProducts] =
    useState<VinProduct[]>(demoVinProducts);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Try to load real data from API, fall back to demo data
    fetch("/api/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error("API unavailable");
        return res.json();
      })
      .then((apiData) => {
        if (apiData && !apiData.error) {
          setData(apiData);
          setIsLive(true);
        }
      })
      .catch(() => {
        // Keep demo data — already set as initial state
      });

    fetch("/api/wines?limit=4")
      .then((res) => {
        if (!res.ok) throw new Error("API unavailable");
        return res.json();
      })
      .then((res) => {
        if (res?.wines?.length > 0) {
          setVinProducts(
            res.wines.map(
              (w: {
                id: string;
                name: string;
                producer: string;
                price: number;
                type: string;
                country: string;
              }) => ({
                id: w.id,
                name: w.name,
                producer: w.producer,
                price: w.price ?? 0,
                type: w.type,
                country: w.country,
              })
            )
          );
        }
      })
      .catch(() => {
        // Keep demo products
      });
  }, []);

  // Rotating food suggestions
  const suggestions = [
    {
      dish: "laks",
      wines: [
        { id: "1", name: "Chablis", type: "WHITE" },
        { id: "2", name: "Sancerre", type: "WHITE" },
        { id: "3", name: "Pinot Grigio", type: "WHITE" },
      ],
    },
    {
      dish: "biff",
      wines: [
        { id: "4", name: "Barolo", type: "RED" },
        { id: "5", name: "Châteauneuf-du-Pape", type: "RED" },
        { id: "6", name: "Cabernet Sauvignon", type: "RED" },
      ],
    },
    {
      dish: "pasta carbonara",
      wines: [
        { id: "7", name: "Tignanello", type: "RED" },
        { id: "8", name: "Valpolicella", type: "RED" },
        { id: "9", name: "Chianti Classico", type: "RED" },
      ],
    },
    {
      dish: "sushi",
      wines: [
        { id: "10", name: "Riesling", type: "WHITE" },
        { id: "11", name: "Grüner Veltliner", type: "WHITE" },
        { id: "12", name: "Champagne Brut", type: "SPARKLING" },
      ],
    },
    {
      dish: "ost",
      wines: [
        { id: "13", name: "Amarone", type: "RED" },
        { id: "14", name: "Sauternes", type: "DESSERT" },
        { id: "15", name: "Porto Tawny", type: "FORTIFIED" },
      ],
    },
  ];
  const todaySuggestion = suggestions[new Date().getDay() % suggestions.length];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("welcome")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        {!isLive && (
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            Demo
          </span>
        )}
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
