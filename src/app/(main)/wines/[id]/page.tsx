import { useTranslations } from "next-intl";
import { Wine, Star, MapPin, Grape, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function WineDetailPage() {
  const t = useTranslations("wines.detail");

  // Demo data
  const wine = {
    name: "Barolo Riserva",
    producer: "Giacomo Conterno",
    vintage: 2016,
    country: "Italia",
    region: "Piemonte",
    subRegion: "Barolo",
    grapes: ["Nebbiolo"],
    type: "RED",
    abv: 14.5,
    price: 1299,
    avgRating: 4.8,
    reviewCount: 12,
    description: "En kraftig og elegant Barolo med noter av tjære, roser, kirsebær og krydder.",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        {/* Wine image placeholder */}
        <div className="h-80 md:h-full rounded-xl bg-muted flex items-center justify-center">
          <Wine className="h-20 w-20 text-muted-foreground/20" />
        </div>

        {/* Wine info */}
        <div className="space-y-4">
          <div>
            <Badge className="mb-2">{wine.type}</Badge>
            <h1 className="text-3xl font-bold">{wine.name}</h1>
            <p className="text-lg text-muted-foreground">{wine.producer} · {wine.vintage}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="text-xl font-bold">{wine.avgRating}</span>
              <span className="text-sm text-muted-foreground">({wine.reviewCount} {t("reviews")})</span>
            </div>
            <span className="text-2xl font-bold">{wine.price} kr</span>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">{t("region")}</p>
                <p className="font-medium">{wine.subRegion}, {wine.region}, {wine.country}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Grape className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">{t("grapes")}</p>
                <p className="font-medium">{wine.grapes.join(", ")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">{t("abv")}</p>
                <p className="font-medium">{wine.abv}%</p>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground">{wine.description}</p>

          <Button size="lg" className="w-full">
            {t("addToCellar")}
          </Button>
        </div>
      </div>

      {/* Reviews section placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>{t("reviews")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Anmeldelser kommer snart...</p>
        </CardContent>
      </Card>
    </div>
  );
}
