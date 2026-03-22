import { useTranslations } from "next-intl";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { CellarDistribution } from "@/components/dashboard/cellar-distribution";
import { DrinkSoonList } from "@/components/dashboard/drink-soon-list";
import { VinmonopoletNew } from "@/components/dashboard/vinmonopolet-new";
import { FoodPairingSuggestion } from "@/components/dashboard/food-pairing-suggestion";
import { CellarValue } from "@/components/dashboard/cellar-value";
import { TopWines } from "@/components/dashboard/top-wines";
import { QuickActions } from "@/components/dashboard/quick-actions";

// Demo data - will be replaced with real data from DB + APIs
const demoStats = {
  totalBottles: 47,
  totalReviews: 23,
  avgRating: 4.2,
  lastTasted: "Barolo Riserva 2019",
};

const demoDistribution = [
  { type: "RED", count: 32, percentage: 68 },
  { type: "WHITE", count: 10, percentage: 22 },
  { type: "SPARKLING", count: 3, percentage: 8 },
  { type: "ROSE", count: 2, percentage: 2 },
];

const demoDrinkSoon = [
  {
    id: "1",
    wineName: "Chablis Premier Cru",
    vintage: 2020,
    drinkBefore: "2026-09-01",
    status: "soon" as const,
  },
  {
    id: "2",
    wineName: "Rioja Reserva",
    vintage: 2017,
    drinkBefore: "2026-04-01",
    status: "optimal" as const,
  },
  {
    id: "3",
    wineName: "Sancerre",
    vintage: 2019,
    drinkBefore: "2026-02-01",
    status: "urgent" as const,
  },
];

const demoVinmonopolet = [
  {
    id: "v1",
    name: "Cloudy Bay Sauvignon Blanc",
    producer: "Cloudy Bay",
    price: 249,
    type: "Hvitvin",
    country: "New Zealand",
  },
  {
    id: "v2",
    name: "Tignanello 2020",
    producer: "Antinori",
    price: 899,
    type: "Rodvin",
    country: "Italia",
  },
  {
    id: "v3",
    name: "Bollinger Special Cuvée",
    producer: "Bollinger",
    price: 599,
    type: "Musserende",
    country: "Frankrike",
  },
  {
    id: "v4",
    name: "Whispering Angel Rosé",
    producer: "Château d'Esclans",
    price: 199,
    type: "Rose",
    country: "Frankrike",
  },
];

const demoFoodSuggestion = {
  dish: "laks",
  wines: [
    { id: "w1", name: "Chablis", type: "WHITE" },
    { id: "w2", name: "Pinot Grigio", type: "WHITE" },
    { id: "w3", name: "Sancerre", type: "WHITE" },
  ],
};

const demoTopWines = [
  { id: "t1", name: "Barolo Riserva", vintage: 2016, rating: 4.8 },
  { id: "t2", name: "Châteauneuf-du-Pape", vintage: 2018, rating: 4.7 },
  { id: "t3", name: "Amarone della Valpolicella", vintage: 2017, rating: 4.5 },
];

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{t("welcome")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Stats Cards */}
      <StatsCards {...demoStats} />

      {/* Two-column layout for medium+ screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <CellarDistribution data={demoDistribution} />
          <DrinkSoonList items={demoDrinkSoon} />
          <CellarValue totalValue={34500} changePercent={12} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <VinmonopoletNew products={demoVinmonopolet} />
          <FoodPairingSuggestion suggestion={demoFoodSuggestion} />
          <TopWines wines={demoTopWines} />
        </div>
      </div>

      {/* Quick Actions FAB */}
      <QuickActions />
    </div>
  );
}
