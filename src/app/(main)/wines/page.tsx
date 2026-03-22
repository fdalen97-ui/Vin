import { useTranslations } from "next-intl";
import { Search, SlidersHorizontal, Wine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const demoWines = [
  { id: "1", name: "Barolo Riserva", producer: "Giacomo Conterno", vintage: 2016, type: "RED", country: "Italia", region: "Piemonte", price: 1299, rating: 4.8 },
  { id: "2", name: "Chablis Grand Cru", producer: "William Fèvre", vintage: 2020, type: "WHITE", country: "Frankrike", region: "Burgund", price: 699, rating: 4.5 },
  { id: "3", name: "Châteauneuf-du-Pape", producer: "Château de Beaucastel", vintage: 2018, type: "RED", country: "Frankrike", region: "Rhône", price: 549, rating: 4.7 },
  { id: "4", name: "Cloudy Bay Sauvignon Blanc", producer: "Cloudy Bay", vintage: 2023, type: "WHITE", country: "New Zealand", region: "Marlborough", price: 249, rating: 4.2 },
  { id: "5", name: "Bollinger Special Cuvée", producer: "Bollinger", vintage: null, type: "SPARKLING", country: "Frankrike", region: "Champagne", price: 599, rating: 4.4 },
  { id: "6", name: "Whispering Angel", producer: "Château d'Esclans", vintage: 2023, type: "ROSE", country: "Frankrike", region: "Provence", price: 199, rating: 4.0 },
];

const typeColors: Record<string, string> = {
  RED: "bg-red-100 text-red-800",
  WHITE: "bg-amber-100 text-amber-800",
  ROSE: "bg-pink-100 text-pink-800",
  SPARKLING: "bg-yellow-100 text-yellow-800",
};

export default function WinesPage() {
  const t = useTranslations("wines");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>

      {/* Search and filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("searchPlaceholder")} className="pl-9" />
        </div>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Wine grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoWines.map((wine) => (
          <Card key={wine.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="h-40 rounded-lg bg-muted flex items-center justify-center mb-4">
                <Wine className="h-12 w-12 text-muted-foreground/30" />
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold leading-tight">{wine.name}</h3>
                  <Badge className={typeColors[wine.type] || ""} variant="secondary">
                    {wine.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{wine.producer}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {wine.region}, {wine.country} {wine.vintage && `· ${wine.vintage}`}
                  </span>
                  <span className="font-semibold">{wine.price} kr</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
