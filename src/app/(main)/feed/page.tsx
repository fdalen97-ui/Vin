"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Star, Wine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReviewFeedItem {
  id: string;
  rating: number;
  notes: string | null;
  nose: string | null;
  createdAt: string;
  user: { name: string | null };
  wine: { id: string; name: string; producer: string };
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} min siden`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} timer siden`;
  const days = Math.floor(hours / 24);
  return `${days} dager siden`;
}

export default function FeedPage() {
  const t = useTranslations("nav");
  const [reviews, setReviews] = useState<ReviewFeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{t("feed")}</h1>

      {loading ? (
        <p className="text-muted-foreground">Laster...</p>
      ) : reviews.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Wine className="h-16 w-16 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground">Ingen aktivitet ennå.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Wine className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{review.user.name ?? "Anonym"}</p>
                      <p className="text-xs text-muted-foreground">{timeAgo(review.createdAt)}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {review.rating}
                  </Badge>
                </div>
                <p className="font-semibold mb-1">{review.wine.name}</p>
                <p className="text-sm text-muted-foreground mb-2">{review.wine.producer}</p>
                {review.notes && <p className="text-sm">{review.notes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
