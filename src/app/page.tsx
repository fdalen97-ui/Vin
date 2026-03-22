import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Wine,
  Camera,
  Archive,
  UtensilsCrossed,
  Star,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";

const featureIcons = {
  scan: Camera,
  cellar: Archive,
  pairing: UtensilsCrossed,
  reviews: Star,
  vinmonopolet: ShoppingBag,
  social: Users,
} as const;

function FeatureCard({
  iconKey,
  title,
  description,
}: {
  iconKey: keyof typeof featureIcons;
  title: string;
  description: string;
}) {
  const Icon = featureIcons[iconKey];
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-transparent hover:border-primary/20">
      <CardContent className="pt-6">
        <div className="rounded-lg bg-primary/5 p-3 w-fit mb-4 group-hover:bg-primary/10 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export default function LandingPage() {
  const t = useTranslations();

  const features = [
    "scan",
    "cellar",
    "pairing",
    "reviews",
    "vinmonopolet",
    "social",
  ] as const;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Wine className="h-4 w-4" />
            {t("common.tagline")}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            {t("landing.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("landing.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-base px-8">
                {t("landing.hero.cta")}
              </Button>
            </Link>
            <Link href="/wines">
              <Button variant="outline" size="lg" className="text-base px-8">
                {t("landing.hero.ctaSecondary")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="15,000+" label={t("landing.stats.wines")} />
            <StatItem value="2,500+" label={t("landing.stats.users")} />
            <StatItem value="8,000+" label={t("landing.stats.reviews")} />
            <StatItem value="3,000+" label={t("landing.stats.pairings")} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("common.tagline")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((key) => (
              <FeatureCard
                key={key}
                iconKey={key}
                title={t(`landing.features.${key}.title`)}
                description={t(`landing.features.${key}.description`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("landing.hero.title")}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            {t("landing.hero.subtitle")}
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-base px-8">
              {t("landing.hero.cta")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Wine className="h-5 w-5 text-primary" />
            <span className="font-semibold">{t("common.appName")}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
