"use client";

import { useTranslations } from "next-intl";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CellarValueProps {
  totalValue: number;
  changePercent: number;
}

export function CellarValue({ totalValue, changePercent }: CellarValueProps) {
  const t = useTranslations("dashboard.cellarValue");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-3xl font-bold">
            {totalValue.toLocaleString("nb-NO")} kr
          </span>
          <span
            className={`flex items-center gap-1 text-sm font-medium ${changePercent >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            <TrendingUp className="h-3 w-3" />
            {changePercent >= 0 ? "+" : ""}
            {changePercent}% {t("change")}
          </span>
        </div>
        {/* Placeholder for chart */}
        <div className="h-32 rounded-lg bg-muted/50 flex items-center justify-center">
          <span className="text-sm text-muted-foreground">
            Prisutvikling (kommer)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
