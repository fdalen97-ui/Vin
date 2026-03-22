import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const item = await db.cellarItem.update({
    where: { id },
    data: {
      ...(body.quantity !== undefined && { quantity: body.quantity }),
      ...(body.purchasePrice !== undefined && { purchasePrice: body.purchasePrice }),
      ...(body.location !== undefined && { location: body.location }),
      ...(body.drinkFrom !== undefined && { drinkFrom: body.drinkFrom ? new Date(body.drinkFrom) : null }),
      ...(body.drinkBefore !== undefined && { drinkBefore: body.drinkBefore ? new Date(body.drinkBefore) : null }),
      ...(body.notes !== undefined && { notes: body.notes }),
    },
    include: { wine: true },
  });

  return Response.json(item);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await db.cellarItem.delete({ where: { id } });

  return Response.json({ success: true });
}
