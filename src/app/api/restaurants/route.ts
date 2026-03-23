import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const city = searchParams.get("city");
    const region = searchParams.get("region");
    const search = searchParams.get("search") ?? "";
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const offset = parseInt(searchParams.get("offset") ?? "0");

    const where: Record<string, unknown> = {};

    if (city) {
      where.city = city;
    }

    if (region) {
      where.region = region;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { area: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [restaurants, total] = await Promise.all([
      db.restaurant.findMany({
        where,
        include: {
          highlights: {
            orderBy: { category: "asc" },
          },
        },
        orderBy: [{ rank: "asc" }, { name: "asc" }],
        take: limit,
        skip: offset,
      }),
      db.restaurant.count({ where }),
    ]);

    const results = restaurants.map((r, i) => ({
      id: r.id,
      rank: r.rank ?? offset + i + 1,
      name: r.name,
      address: r.address,
      city: r.city,
      region: r.region,
      area: r.area,
      venueType: r.venueType,
      wineCount: r.wineCount,
      rating: r.rating,
      priceTier: r.priceTier,
      tags: JSON.parse(r.tags || "[]"),
      awards: JSON.parse(r.awards || "[]"),
      description: r.description,
      documentUrl: r.documentUrl,
      confidence: r.confidence,
      highlights: r.highlights.map((h) => ({
        category: h.category,
        wineName: h.wineName,
        producer: h.producer,
        vintage: h.vintage,
        priceBottleNok: h.priceBottleNok,
        priceGlassNok: h.priceGlassNok,
        pour: h.pour,
        sourceRef: h.sourceRef,
      })),
    }));

    return Response.json({
      city: city,
      region: region,
      generatedAt: new Date().toISOString(),
      ranking: {
        method: "source_order",
        scoringRules: null,
      },
      results,
      total,
      errors: [],
    });
  } catch (error) {
    console.error("Restaurants API error:", error);
    return Response.json(
      {
        city: null,
        region: null,
        generatedAt: new Date().toISOString(),
        ranking: { method: "source_order", scoringRules: null },
        results: [],
        total: 0,
        errors: ["Database unavailable"],
      },
      { status: 503 }
    );
  }
}
