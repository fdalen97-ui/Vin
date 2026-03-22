import { useTranslations } from "next-intl";
import { User, Settings, Wine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export default function ProfilePage() {
  const t = useTranslations("profile");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <User className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Vinelsker</h2>
              <p className="text-muted-foreground">vinelsker@example.com</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Wine className="h-4 w-4" />
            {t("tasteProfile")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Smaksprofilen din bygges automatisk basert på viner du anmelder og legger til i kjelleren.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t("settings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">{t("language")}</span>
            <LanguageSwitcher />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-sm">{t("theme")}</span>
            <span className="text-sm text-muted-foreground">System</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
