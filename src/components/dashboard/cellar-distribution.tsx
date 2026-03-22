"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DistributionItem {
  type: string;
  count: number;
  percentage: number;
}

const typeColors: Record<string, string> = {
  RED: "bg-red-500",
  WHITE: "bg-amber-300",
  ROSE: "bg-pink-400",
  SPARKLING: "bg-yellow-400",
  ORANGE: "bg-orange-400",
  DESSERT: "bg-amber-600",
  FORTIFIED: "bg-purple-600",
};

export function CellarDistribution({ data }: { data: DistributionItem[] }) {
  const t = useTranslations("dashboard.distribution");

  const typeLabels: Record<string, string> = {
    RED: t("red"),
    WHITE: t("white"),
    SPARKLING: t("sparkling"),
    ROSE: t("rose"),
    ORANGE: t("orange"),
    DESSERT: t("dessert"),
    FORTIFIED: t("fortified"),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.type} className="flex items-center gap-3">
              <div className="w-24 text-sm text-muted-foreground">
                {typeLabels[item.type] || item.type}
              </div>
              <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${typeColors[item.type] || "bg-gray-400"}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="w-16 text-sm text-right font-medium">
                {item.percentage}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
