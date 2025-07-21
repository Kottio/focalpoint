import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/index.js";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const categoryId = searchParams.get("category");
    const tags = searchParams.get("tags")?.split(",").filter(Boolean);
    const search = searchParams.get("search");

    // Parse map bounds
    const north = searchParams.get("north");
    const south = searchParams.get("south");
    const east = searchParams.get("east");
    const west = searchParams.get("west");

    // Build where clause
    const whereClause: any = {
      AND: [],
    };

    // Filter by category
    if (categoryId) {
      whereClause.AND.push({ categoryId: parseInt(categoryId) });
    }

    // Filter by tags
    if (tags && tags.length > 0) {
      whereClause.AND.push({
        spotTags: {
          some: {
            tagId: { in: tags.map((id) => parseInt(id)) },
          },
        },
      });
    }

    // Filter by search term
    if (search) {
      whereClause.AND.push({
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    // Filter by map bounds
    if (north && south && east && west) {
      whereClause.AND.push({
        latitude: {
          gte: parseFloat(south),
          lte: parseFloat(north),
        },
        longitude: {
          gte: parseFloat(west),
          lte: parseFloat(east),
        },
      });
    }

    // Remove empty AND array if no filters
    if (whereClause.AND.length === 0) {
      delete whereClause.AND;
    }

    // Fetch spots with related data
    const spots = await prisma.spot.findMany({
      where: whereClause,
      include: {
        category: true,
        spotTags: {
          include: {
            tag: true,
          },
        },
        photos: {
          where: { isPrimary: true },
        },
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
        votes: {
          where: { voteType: "UP" },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform data for frontend

    const transformedSpots = spots.map((spot) => ({
      id: spot.id,
      title: spot.title,
      description: spot.description,
      latitude: parseFloat(spot.latitude.toString()),
      longitude: parseFloat(spot.longitude.toString()),
      category: spot.category.name,
      categoryId: spot.categoryId,
      tags: spot.spotTags.map((st) => ({
        id: st.tag.id,
        name: st.tag.name,
        color: st.tag.color,
      })),
      primaryPhoto: spot.photos[0] ? {
        id: spot.photos[0].id,
        thumbnail: spot.photos[0].thumbnailUrl,
        medium: spot.photos[0].mediumUrl,
        original: spot.photos[0].originalUrl,
        likes: spot.photos[0].likes
      } : null,
      user: spot.user,
      upvotes: spot.votes.length,
      createdAt: spot.createdAt,
    }));

    return NextResponse.json(transformedSpots);
  } catch (error) {
    console.error("Error fetching spots:", error);
    return NextResponse.json(
      { error: "Failed to fetch spots" },
      { status: 500 }
    );
  }
}
