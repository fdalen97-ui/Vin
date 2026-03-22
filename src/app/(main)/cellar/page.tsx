"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Archive, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CellarItemData {
  id: string;
  quantity: number;
  purchasePrice: number | null;
  location: string | null;
  wine: {
    id: string;
    name: string;
    producer: string;
    vintage: number | null;
    type: string;
    price: number | null;
  };
}

export default function CellarPage() {
  const t = useTranslations("cellar");
  const [items, setItems] = useState<CellarItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cellar")
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalBottles = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = items.reduce(
    (sum, item) => sum + item.quantity * (item.purchasePrice ?? item.wine.price ?? 0),
    0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Laster kjeller...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">
            {t("totalBottles")}: {totalBottles} · {t("totalValue")}: {totalValue.toLocaleString("nb-NO")} kr
          </p>
        </div>
        <Link href="/wines">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("addWine")}
          </Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Wine className="h-16 w-16 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground">{t("empty")}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Link key={item.id} href={`/cellar/${item.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Wine className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.quantity} fl.
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-1">
                    {item.wine.name} {item.wine.vintage && item.wine.vintage}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.wine.producer}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Archive className="h-3 w-3" />
                      {item.location ?? "Ingen plassering"}
                    </span>
                    <span className="font-medium">{item.purchasePrice ?? item.wine.price ?? 0} kr</span>
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
