import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const search = searchParams.get("search") ?? "";
    const type = searchParams.get("type");
    const region = searchParams.get("region");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const offset = parseInt(searchParams.get("offset") ?? "0");

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { producer: { contains: search } },
        { region: { contains: search } },
        { country: { contains: search } },
      ];
    }

    if (type) {
      where.type = type;
    }

    if (region) {
      where.region = { contains: region };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice)
        (where.price as Record<string, unknown>).gte = parseFloat(minPrice);
      if (maxPrice)
        (where.price as Record<string, unknown>).lte = parseFloat(maxPrice);
    }

    const [wines, total] = await Promise.all([
      db.wine.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { name: "asc" },
      }),
      db.wine.count({ where }),
    ]);

    // Parse grapeVarieties JSON string for each wine
    const parsedWines = wines.map((w) => ({
      ...w,
      grapeVarieties: JSON.parse(w.grapeVarieties || "[]"),
    }));

    return Response.json({ wines: parsedWines, total });
  } catch (error) {
    console.error("Wines API error:", error);
    return Response.json({ wines: [], total: 0, error: "Database unavailable" }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const wine = await db.wine.create({
      data: {
        name: body.name,
        producer: body.producer,
        vintage: body.vintage ?? null,
        country: body.country,
        region: body.region ?? null,
        subRegion: body.subRegion ?? null,
        grapeVarieties: JSON.stringify(body.grapeVarieties ?? []),
        type: body.type ?? "RED",
        abv: body.abv ?? null,
        price: body.price ?? null,
        description: body.description ?? null,
        imageUrl: body.imageUrl ?? null,
      },
    });

    return Response.json(wine, { status: 201 });
  } catch (error) {
    console.error("Create wine error:", error);
    return Response.json({ error: "Failed to create wine" }, { status: 500 });
  }
}
