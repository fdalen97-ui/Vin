import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CellarItemPage() {

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Kjellerdetaljer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Detaljer for kjellervare kommer snart...</p>
        </CardContent>
      </Card>
    </div>
  );
}
