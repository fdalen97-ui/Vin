"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Wine, MapPin, Calendar, Archive, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CellarItemDetail {
  id: string;
  quantity: number;
  purchasePrice: number | null;
  purchaseDate: string | null;
  location: string | null;
  drinkFrom: string | null;
  drinkBefore: string | null;
  notes: string | null;
  wine: {
    id: string;
    name: string;
    producer: string;
    vintage: number | null;
    type: string;
    country: string;
    region: string | null;
    price: number | null;
    avgRating: number;
    description: string | null;
  };
}

function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("nb-NO", { year: "numeric", month: "long" });
}

export default function CellarItemPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<CellarItemDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch("/api/cellar")
        .then((res) => res.json())
        .then((items: CellarItemDetail[]) => {
          const found = items.find((i: CellarItemDetail) => i.id === params.id);
          setItem(found ?? null);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (!item || !confirm("Er du sikker på at du vil slette denne fra kjelleren?")) return;
    await fetch(`/api/cellar/${item.id}`, { method: "DELETE" });
    router.push("/cellar");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Laster...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="text-muted-foreground mb-4">Kjellervare ikke funnet.</p>
        <Link href="/cellar">
          <Button variant="outline">Tilbake til kjeller</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" className="gap-2" onClick={() => router.push("/cellar")}>
        <ArrowLeft className="h-4 w-4" />
        Tilbake
      </Button>

      <div className="flex items-start gap-4">
        <div className="h-20 w-20 rounded-xl bg-muted flex items-center justify-center shrink-0">
          <Wine className="h-10 w-10 text-muted-foreground/20" />
        </div>
        <div>
          <Badge className="mb-1">{item.wine.type}</Badge>
          <h1 className="text-2xl font-bold">{item.wine.name}</h1>
          <p className="text-muted-foreground">
            {item.wine.producer} {item.wine.vintage && `· ${item.wine.vintage}`}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kjellerdetaljer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Archive className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Antall</p>
                <p className="font-medium">{item.quantity} flasker</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Plassering</p>
                <p className="font-medium">{item.location ?? "Ikke angitt"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Innkjøpspris</p>
                <p className="font-medium">{item.purchasePrice ?? item.wine.price ?? 0} kr</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Kjøpsdato</p>
                <p className="font-medium">{formatDate(item.purchaseDate)}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Drikk fra</p>
              <p className="font-medium">{formatDate(item.drinkFrom)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Drikk før</p>
              <p className="font-medium">{formatDate(item.drinkBefore)}</p>
            </div>
          </div>

          {item.notes && (
            <>
              <Separator />
              <div>
                <p className="text-muted-foreground text-sm mb-1">Notater</p>
                <p className="text-sm">{item.notes}</p>
              </div>
            </>
          )}

          {item.wine.description && (
            <>
              <Separator />
              <div>
                <p className="text-muted-foreground text-sm mb-1">Om vinen</p>
                <p className="text-sm">{item.wine.description}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Link href={`/wines/${item.wine.id}`} className="flex-1">
          <Button variant="outline" className="w-full">Se vindetaljer</Button>
        </Link>
        <Button variant="destructive" className="gap-2" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
          Slett
        </Button>
      </div>
    </div>
  );
}
