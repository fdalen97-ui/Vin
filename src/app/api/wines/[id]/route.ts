import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const wine = await db.wine.findUnique({
    where: { id },
    include: {
      reviews: {
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      pairings: true,
    },
  });

  if (!wine) {
    return Response.json({ error: "Wine not found" }, { status: 404 });
  }

  return Response.json({
    ...wine,
    grapeVarieties: JSON.parse(wine.grapeVarieties || "[]"),
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const wine = await db.wine.update({
    where: { id },
    data: {
      ...(body.name && { name: body.name }),
      ...(body.producer && { producer: body.producer }),
      ...(body.vintage !== undefined && { vintage: body.vintage }),
      ...(body.country && { country: body.country }),
      ...(body.region !== undefined && { region: body.region }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.price !== undefined && { price: body.price }),
      ...(body.grapeVarieties && { grapeVarieties: JSON.stringify(body.grapeVarieties) }),
    },
  });

  return Response.json(wine);
}
