"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Wine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WineItem {
  id: string;
  name: string;
  producer: string;
  vintage: number | null;
  type: string;
  country: string;
  region: string | null;
  price: number | null;
  avgRating: number;
}

const typeColors: Record<string, string> = {
  RED: "bg-red-100 text-red-800",
  WHITE: "bg-amber-100 text-amber-800",
  ROSE: "bg-pink-100 text-pink-800",
  SPARKLING: "bg-yellow-100 text-yellow-800",
  DESSERT: "bg-orange-100 text-orange-800",
  FORTIFIED: "bg-purple-100 text-purple-800",
  ORANGE: "bg-orange-200 text-orange-900",
};

export default function WinesPage() {
  const t = useTranslations("wines");
  const [wines, setWines] = useState<WineItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`/api/wines?search=${encodeURIComponent(search)}`)
        .then((res) => res.json())
        .then((data) => setWines(data.wines))
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {loading && wines.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Laster viner...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wines.map((wine) => (
            <Link key={wine.id} href={`/wines/${wine.id}`}>
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer h-full">
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
                      {wine.price && <span className="font-semibold">{wine.price} kr</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
