import { NextRequest } from "next/server";
import { db } from "@/lib/db";

async function getDemoUserId() {
  const user = await db.user.findFirst();
  return user?.id;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const wineId = searchParams.get("wineId");

  const where: Record<string, unknown> = {};
  if (wineId) where.wineId = wineId;

  const reviews = await db.review.findMany({
    where,
    include: {
      user: { select: { id: true, name: true, image: true } },
      wine: { select: { id: true, name: true, producer: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return Response.json(reviews);
}

export async function POST(request: NextRequest) {
  const userId = await getDemoUserId();
  if (!userId) {
    return Response.json({ error: "No user found" }, { status: 401 });
  }

  const body = await request.json();

  const review = await db.review.create({
    data: {
      rating: body.rating,
      nose: body.nose ?? null,
      palate: body.palate ?? null,
      finish: body.finish ?? null,
      notes: body.notes ?? null,
      userId,
      wineId: body.wineId,
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  });

  // Update wine average rating
  const allReviews = await db.review.findMany({
    where: { wineId: body.wineId },
  });
  const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
  await db.wine.update({
    where: { id: body.wineId },
    data: {
      avgRating: Math.round(avg * 10) / 10,
      reviewCount: allReviews.length,
    },
  });

  return Response.json(review, { status: 201 });
}
