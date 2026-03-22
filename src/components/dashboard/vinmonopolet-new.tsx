"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Wine } from "lucide-react";

interface VinmonopoletProduct {
  id: string;
  name: string;
  producer: string;
  price: number;
  type: string;
  country: string;
  imageUrl?: string | null;
}

export function VinmonopoletNew({
  products,
}: {
  products: VinmonopoletProduct[];
}) {
  const t = useTranslations("dashboard.vinmonopolet");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">{t("title")}</CardTitle>
        <Link
          href="/wines"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          {t("newArrivals")} &rarr;
        </Link>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[180px] space-y-2"
              >
                <div className="h-48 rounded-lg bg-muted flex items-center justify-center">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={180}
                      height={192}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <Wine className="h-12 w-12 text-muted-foreground/30" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {product.producer}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.type}
                    </Badge>
                    <span className="text-sm font-semibold">
                      {product.price} kr
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
