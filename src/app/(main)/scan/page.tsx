import { useTranslations } from "next-intl";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ScanPage() {
  const t = useTranslations("scan");

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("instructions")}</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {/* Camera preview area */}
          <div className="aspect-[3/4] rounded-xl bg-muted flex flex-col items-center justify-center gap-4 border-2 border-dashed border-muted-foreground/20">
            <Camera className="h-16 w-16 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">{t("instructions")}</p>
          </div>

          <div className="flex gap-3 mt-6">
            <Button className="flex-1 gap-2" size="lg">
              <Camera className="h-4 w-4" />
              {t("capture")}
            </Button>
            <Button variant="outline" className="flex-1 gap-2" size="lg">
              <Upload className="h-4 w-4" />
              {t("upload")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
