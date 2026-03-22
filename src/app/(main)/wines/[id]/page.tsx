"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Wine, Star, MapPin, Grape, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface WineDetail {
  id: string;
  name: string;
  producer: string;
  vintage: number | null;
  country: string;
  region: string | null;
  subRegion: string | null;
  grapeVarieties: string[];
  type: string;
  abv: number | null;
  price: number | null;
  avgRating: number;
  reviewCount: number;
  description: string | null;
  reviews: {
    id: string;
    rating: number;
    nose: string | null;
    palate: string | null;
    finish: string | null;
    notes: string | null;
    createdAt: string;
    user: { id: string; name: string | null; image: string | null };
  }[];
  pairings: { id: string; dish: string; category: string; strength: number }[];
}

export default function WineDetailPage() {
  const t = useTranslations("wines.detail");
  const params = useParams();
  const [wine, setWine] = useState<WineDetail | null>(null);
  const [addingToCellar, setAddingToCellar] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/wines/${params.id}`)
        .then((res) => res.json())
        .then(setWine)
        .catch(console.error);
    }
  }, [params.id]);

  const handleAddToCellar = async () => {
    if (!wine) return;
    setAddingToCellar(true);
    try {
      await fetch("/api/cellar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wineId: wine.id, quantity: 1, purchasePrice: wine.price }),
      });
      alert("Lagt til i kjeller!");
    } catch (err) {
      console.error(err);
    } finally {
      setAddingToCellar(false);
    }
  };

  if (!wine) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Laster vin...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="h-80 md:h-full rounded-xl bg-muted flex items-center justify-center">
          <Wine className="h-20 w-20 text-muted-foreground/20" />
        </div>

        <div className="space-y-4">
          <div>
            <Badge className="mb-2">{wine.type}</Badge>
            <h1 className="text-3xl font-bold">{wine.name}</h1>
            <p className="text-lg text-muted-foreground">
              {wine.producer} {wine.vintage && `· ${wine.vintage}`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="text-xl font-bold">{wine.avgRating}</span>
              <span className="text-sm text-muted-foreground">({wine.reviewCount} {t("reviews")})</span>
            </div>
            {wine.price && <span className="text-2xl font-bold">{wine.price} kr</span>}
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">{t("region")}</p>
                <p className="font-medium">
                  {[wine.subRegion, wine.region, wine.country].filter(Boolean).join(", ")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Grape className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">{t("grapes")}</p>
                <p className="font-medium">{wine.grapeVarieties.join(", ")}</p>
              </div>
            </div>
            {wine.abv && (
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">{t("abv")}</p>
                  <p className="font-medium">{wine.abv}%</p>
                </div>
              </div>
            )}
          </div>

          {wine.description && <p className="text-muted-foreground">{wine.description}</p>}

          <Button size="lg" className="w-full" onClick={handleAddToCellar} disabled={addingToCellar}>
            {addingToCellar ? "Legger til..." : t("addToCellar")}
          </Button>
        </div>
      </div>

      {/* Food Pairings */}
      {wine.pairings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("pairings")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {wine.pairings.map((p) => (
                <Badge key={p.id} variant="outline" className="text-sm">
                  {p.dish} {"★".repeat(p.strength)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>{t("reviews")} ({wine.reviews.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {wine.reviews.length === 0 ? (
            <p className="text-muted-foreground">Ingen anmeldelser ennå.</p>
          ) : (
            wine.reviews.map((review) => (
              <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.user.name ?? "Anonym"}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{review.rating}</span>
                  </div>
                </div>
                {review.nose && (
                  <p className="text-sm"><span className="text-muted-foreground">Nese:</span> {review.nose}</p>
                )}
                {review.palate && (
                  <p className="text-sm"><span className="text-muted-foreground">Smak:</span> {review.palate}</p>
                )}
                {review.finish && (
                  <p className="text-sm"><span className="text-muted-foreground">Avslutning:</span> {review.finish}</p>
                )}
                {review.notes && <p className="text-sm mt-1">{review.notes}</p>}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
