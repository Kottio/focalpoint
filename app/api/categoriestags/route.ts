import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  try {
    const [categories, tags] = await Promise.all([
      prisma.category.findMany({
        orderBy: { name: "asc" },
      }),
      prisma.tag.findMany({
        orderBy: { name: "asc" },
      }),
    ]);

    return NextResponse.json({
      categories,
      tags,
    });
  } catch (error) {
    console.error("Error fetching categories and tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories and tags" },
      { status: 500 }
    );
  }
}
