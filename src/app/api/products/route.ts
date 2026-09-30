import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { products as staticProducts } from "@/lib/data/products";

export async function GET() {
  try {
    const dbProducts = await prisma.product.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });

    if (dbProducts.length > 0) {
      return NextResponse.json(dbProducts);
    }
  } catch {
    // fallback to static
  }

  return NextResponse.json(staticProducts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({ data: body });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 400 });
  }
}
