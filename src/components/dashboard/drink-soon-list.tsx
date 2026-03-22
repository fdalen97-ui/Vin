"use client";

import { useTranslations } from "next-intl";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DrinkSoonItem {
  id: string;
  wineName: string;
  vintage: number | null;
  drinkBefore: string;
  status: "optimal" | "soon" | "urgent";
}

export function DrinkSoonList({ items }: { items: DrinkSoonItem[] }) {
  const t = useTranslations("dashboard.drinkSoon");

  const statusConfig = {
    optimal: {
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      label: t("optimal"),
    },
    soon: {
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      label: t("within", { months: 6 }),
    },
    urgent: {
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
      label: t("pastPeak"),
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Ingen viner med drikkevindu akkurat nå.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => {
              const config = statusConfig[item.status];
              const StatusIcon = config.icon;
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-lg ${config.bg}`}
                >
                  <StatusIcon className={`h-4 w-4 ${config.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.wineName}{" "}
                      {item.vintage && (
                        <span className="text-muted-foreground">
                          {item.vintage}
                        </span>
                      )}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {config.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
