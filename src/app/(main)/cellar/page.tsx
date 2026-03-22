import { useTranslations } from "next-intl";
import { Plus, Archive, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const demoCellar = [
  { id: "1", wine: "Barolo Riserva 2016", producer: "Giacomo Conterno", qty: 3, price: 1299, location: "Rack A, Rad 2", type: "RED" },
  { id: "2", wine: "Chablis Grand Cru 2020", producer: "William Fèvre", qty: 2, price: 699, location: "Rack B, Rad 1", type: "WHITE" },
  { id: "3", wine: "Bollinger Special Cuvée", producer: "Bollinger", qty: 6, price: 599, location: "Rack C, Rad 3", type: "SPARKLING" },
  { id: "4", wine: "Châteauneuf-du-Pape 2018", producer: "Beaucastel", qty: 1, price: 549, location: "Rack A, Rad 4", type: "RED" },
];

export default function CellarPage() {
  const t = useTranslations("cellar");

  const totalBottles = demoCellar.reduce((sum, item) => sum + item.qty, 0);
  const totalValue = demoCellar.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">
            {t("totalBottles")}: {totalBottles} · {t("totalValue")}: {totalValue.toLocaleString("nb-NO")} kr
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("addWine")}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoCellar.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Wine className="h-8 w-8 text-muted-foreground/30" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.qty} fl.
                </Badge>
              </div>
              <h3 className="font-semibold mb-1">{item.wine}</h3>
              <p className="text-sm text-muted-foreground mb-2">{item.producer}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Archive className="h-3 w-3" />
                  {item.location}
                </span>
                <span className="font-medium">{item.price} kr</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
