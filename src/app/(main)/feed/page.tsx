import { useTranslations } from "next-intl";
import { Rss } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function FeedPage() {
  const t = useTranslations("nav");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{t("feed")}</h1>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Rss className="h-16 w-16 text-muted-foreground/20 mb-4" />
          <h2 className="text-lg font-semibold mb-2">Sosial vinopplevelse</h2>
          <p className="text-muted-foreground text-center max-w-sm">
            Her kan du snart se hva vennene dine drikker, følge eksperter og oppdage nye viner.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
