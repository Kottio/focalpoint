import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        photos: {},
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

      thumbnailPhoto: spot.photos[0]
        ? spot.photos[0].thumbnailUrl
        : "/mainPhotos/65030013.jpg",

      mediumPhotos: spot.photos[0]
        ? spot.photos.map((p) => {
            return {
              id: p.id,
              url: p.mediumUrl,
              likes: p.likes,
            };
          })
        : [{ url: "/mainPhotos/65030013.jpg" }],

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Creating spot with data:", body);

    // Validate required fields
    if (!body.title || !body.latitude || !body.longitude || !body.category) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, latitude, longitude, category",
        },
        { status: 400 }
      );
    }

    // Find category by name (since we're sending the name, not the ID)
    const category = await prisma.category.findFirst({
      where: { name: body.category },
    });

    if (!category) {
      return NextResponse.json(
        { error: `Category '${body.category}' not found` },
        { status: 404 }
      );
    }

    // Create the spot with tags and photos
    const newSpot = await prisma.spot.create({
      data: {
        title: body.title,
        description: body.description || null,
        latitude: body.latitude,
        longitude: body.longitude,
        categoryId: category.id,
        userId: "1", // For now, no user authentication
        // Create spotTags relations if tags are provided
        spotTags:
          body.tags && body.tags.length > 0
            ? {
                create: body.tags.map((tagId: number) => ({
                  tag: {
                    connect: { id: tagId },
                  },
                })),
              }
            : undefined,
        // Create photos if provided
        photos:
          body.photos && body.photos.length > 0
            ? {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                create: body.photos.map((photo: any, index: number) => ({
                  originalUrl: photo.originalUrl,

                  mediumUrl: photo.mediumUrl,
                  publicId: photo.publicId,
                  isPrimary: index === 0, // First photo is primary
                  likes: 0,
                  userId: "1",
                })),
              }
            : undefined,
      },
      include: {
        category: true,
        photos: true,
        spotTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    console.log("Spot created successfully:", newSpot.id);

    // Transform response to match frontend format
    const transformedSpot = {
      id: newSpot.id,
      title: newSpot.title,
      description: newSpot.description,
      latitude: parseFloat(newSpot.latitude.toString()),
      longitude: parseFloat(newSpot.longitude.toString()),
      category: newSpot.category.name,
      categoryId: newSpot.categoryId,
      tags: newSpot.spotTags.map((st) => ({
        id: st.tag.id,
        name: st.tag.name,
        color: st.tag.color,
      })),
    };

    return NextResponse.json(transformedSpot, { status: 201 });
  } catch (error) {
    console.error("Error creating spot:", error);
    return NextResponse.json(
      {
        error: "Failed to create spot",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
