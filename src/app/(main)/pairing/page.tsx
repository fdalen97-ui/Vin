import { useTranslations } from "next-intl";
import { Search, UtensilsCrossed, Wine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const demoPairings = [
  { dish: "Laks", wines: ["Chablis", "Sancerre", "Pinot Grigio"] },
  { dish: "Biff", wines: ["Barolo", "Cabernet Sauvignon", "Malbec"] },
  { dish: "Ost", wines: ["Amarone", "Port", "Sauternes"] },
  { dish: "Pasta Carbonara", wines: ["Pinot Grigio", "Verdicchio", "Soave"] },
  { dish: "Sushi", wines: ["Riesling", "Grüner Veltliner", "Champagne"] },
  { dish: "Lam", wines: ["Rioja", "Châteauneuf-du-Pape", "Syrah"] },
];

export default function PairingPage() {
  const t = useTranslations("pairing");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>

      <Tabs defaultValue="food" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="food" className="gap-2">
            <UtensilsCrossed className="h-4 w-4" />
            {t("searchDish")}
          </TabsTrigger>
          <TabsTrigger value="wine" className="gap-2">
            <Wine className="h-4 w-4" />
            {t("searchWine")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="food" className="space-y-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("searchDish")} className="pl-9" />
          </div>

          <div className="grid gap-3">
            {demoPairings.map((pairing) => (
              <Card key={pairing.dish} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                    <UtensilsCrossed className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{pairing.dish}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {pairing.wines.join(" · ")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wine" className="space-y-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("searchWine")} className="pl-9" />
          </div>
          <p className="text-center text-muted-foreground py-8">
            Skriv inn en vin for å finne matforslag...
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
