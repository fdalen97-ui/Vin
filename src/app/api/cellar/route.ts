import { NextRequest } from "next/server";
import { db } from "@/lib/db";

// For now, use demo user. Will be replaced with auth session.
async function getDemoUserId() {
  const user = await db.user.findFirst();
  return user?.id;
}

export async function GET() {
  const userId = await getDemoUserId();
  if (!userId) {
    return Response.json({ error: "No user found" }, { status: 401 });
  }

  const items = await db.cellarItem.findMany({
    where: { userId },
    include: {
      wine: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const parsedItems = items.map((item) => ({
    ...item,
    wine: {
      ...item.wine,
      grapeVarieties: JSON.parse(item.wine.grapeVarieties || "[]"),
    },
  }));

  return Response.json(parsedItems);
}

export async function POST(request: NextRequest) {
  const userId = await getDemoUserId();
  if (!userId) {
    return Response.json({ error: "No user found" }, { status: 401 });
  }

  const body = await request.json();

  const item = await db.cellarItem.create({
    data: {
      quantity: body.quantity ?? 1,
      purchasePrice: body.purchasePrice ?? null,
      purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : null,
      location: body.location ?? null,
      drinkFrom: body.drinkFrom ? new Date(body.drinkFrom) : null,
      drinkBefore: body.drinkBefore ? new Date(body.drinkBefore) : null,
      notes: body.notes ?? null,
      userId,
      wineId: body.wineId,
    },
    include: { wine: true },
  });

  return Response.json(item, { status: 201 });
}
