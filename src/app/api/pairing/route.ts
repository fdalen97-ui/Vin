import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const dish = searchParams.get("dish");
  const wineId = searchParams.get("wineId");
  const category = searchParams.get("category");

  const where: Record<string, unknown> = {};

  if (dish) {
    where.dish = { contains: dish };
  }

  if (wineId) {
    where.wineId = wineId;
  }

  if (category) {
    where.category = category;
  }

  const pairings = await db.foodPairing.findMany({
    where,
    include: {
      wine: {
        select: {
          id: true,
          name: true,
          producer: true,
          type: true,
          price: true,
          avgRating: true,
        },
      },
    },
    orderBy: { strength: "desc" },
  });

  return Response.json(pairings);
}
