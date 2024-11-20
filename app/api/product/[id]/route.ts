import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { userId } = auth();
  try {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const productSizes = await db.productSize.findMany({
      where: {
        productId: id,
      },
    });

    const orderItems = await db.orderItem.findMany({
      where: {
        productId: id,
      },
    });

    await Promise.all(
      orderItems.map(async (orderItem) => {
        await db.orderItem.delete({
          where: {
            id: orderItem.id,
          },
        });
      })
    );

    await Promise.all(
      productSizes.map(async (productSize) => {
        await db.productSize.delete({
          where: {
            id: productSize.id,
          },
        });
      })
    );

    const task = await db.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const product = await db.product.findUnique({
      where: {
        id,
      },
      include: {
        productSizes: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Error getting product", status: 500 });
  }
}
