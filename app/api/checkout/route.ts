import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CartItem } from "@/hooks/use-cart";

export async function POST(req: Request) {
  const { items } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json("Product its are required", { status: 400 });
  }

  const order = await db.order.create({
    data: {
      isPaid: false,
      orderItems: {
        create: items.map((product: CartItem) => ({
          productName: product.title,
          product: {
            connect: {
              id: product.id,
            },
          },
        })),
      },
    },
  });

  return NextResponse.json({ order: order, status: 200 });
}
