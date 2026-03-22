import { db } from "@/lib/db";

async function getDemoUserId() {
  try {
    const user = await db.user.findFirst();
    return user?.id;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const userId = await getDemoUserId();
    if (!userId) {
      return Response.json({ error: "No user found" }, { status: 404 });
    }

    // Cellar items with wines
    const cellarItems = await db.cellarItem.findMany({
      where: { userId },
      include: { wine: true },
    });

    const totalBottles = cellarItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const cellarValue = cellarItems.reduce(
      (sum, item) =>
        sum + item.quantity * (item.purchasePrice ?? item.wine.price ?? 0),
      0
    );

    // Reviews
    const reviews = await db.review.findMany({
      where: { userId },
      include: { wine: true },
      orderBy: { createdAt: "desc" },
    });

    const avgRating =
      reviews.length > 0
        ? Math.round(
            (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) *
              10
          ) / 10
        : 0;

    const lastTasted = reviews[0]?.wine?.name ?? null;

    // Cellar distribution
    const typeCount: Record<string, number> = {};
    for (const item of cellarItems) {
      typeCount[item.wine.type] =
        (typeCount[item.wine.type] ?? 0) + item.quantity;
    }
    const distribution = Object.entries(typeCount)
      .map(([type, count]) => ({
        type,
        count,
        percentage:
          totalBottles > 0 ? Math.round((count / totalBottles) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Drink soon
    const now = new Date();
    const sixMonths = new Date(now.getTime() + 6 * 30 * 24 * 60 * 60 * 1000);
    const drinkSoon = cellarItems
      .filter(
        (item) => item.drinkBefore && new Date(item.drinkBefore) <= sixMonths
      )
      .map((item) => {
        const drinkBefore = new Date(item.drinkBefore!);
        let status: "urgent" | "optimal" | "soon" = "soon";
        if (drinkBefore < now) status = "urgent";
        else if (
          drinkBefore <
          new Date(now.getTime() + 2 * 30 * 24 * 60 * 60 * 1000)
        )
          status = "optimal";

        return {
          id: item.id,
          wineName: item.wine.name,
          vintage: item.wine.vintage,
          drinkBefore: item.drinkBefore,
          status,
        };
      })
      .sort(
        (a, b) =>
          new Date(a.drinkBefore!).getTime() -
          new Date(b.drinkBefore!).getTime()
      );

    // Top wines (user's highest rated)
    const topWines = reviews
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5)
      .map((r) => ({
        id: r.wine.id,
        name: r.wine.name,
        vintage: r.wine.vintage,
        rating: r.rating,
      }));

    return Response.json({
      totalBottles,
      totalReviews: reviews.length,
      avgRating,
      lastTasted,
      cellarValue,
      distribution,
      drinkSoon,
      topWines,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return Response.json(
      { error: "Database unavailable" },
      { status: 503 }
    );
  }
}
