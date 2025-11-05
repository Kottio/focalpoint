import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Get user data with spots, photos, and saved spots
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        bio: true,
        avatarUrl: true,
        // User's created spots
        spots: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            latitude: true,
            longitude: true,
            createdAt: true,
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            spotTags: {
              select: {
                tag: {
                  select: {
                    id: true,
                    name: true,
                    color: true,
                  },
                },
              },
            },
            user: {
              select: {
                id: true,
                username: true,
                fullName: true,
                avatarUrl: true,
              },
            },
            photos: {
              orderBy: { isPrimary: "desc" },
              select: {
                id: true,
                originalUrl: true,
                thumbnailUrl: true,
                mediumUrl: true,
                publicId: true,
                title: true,
                description: true,
                isPrimary: true,
                likes: true,
                userIdLiked: true,
                createdAt: true,
              },
            },
            _count: {
              select: {
                SavedSpot: true,
              },
            },
          },
        },
        // User's photos
        photos: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            originalUrl: true,
            thumbnailUrl: true,
            mediumUrl: true,
            publicId: true,
            title: true,
            description: true,
            isPrimary: true,
            likes: true,
            userIdLiked: true,
            createdAt: true,
          },
        },
        // User's saved spots
        SavedSpots: {
          orderBy: { savedAt: "desc" },
          select: {
            spot: {
              select: {
                id: true,
                title: true,
                latitude: true,
                longitude: true,
                createdAt: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                  },
                },
                spotTags: {
                  select: {
                    tag: {
                      select: {
                        id: true,
                        name: true,
                        color: true,
                      },
                    },
                  },
                },
                user: {
                  select: {
                    id: true,
                    username: true,
                    fullName: true,
                    avatarUrl: true,
                  },
                },
                photos: {
                  orderBy: { isPrimary: "desc" },
                  select: {
                    id: true,
                    originalUrl: true,
                    thumbnailUrl: true,
                    mediumUrl: true,
                    publicId: true,
                    title: true,
                    description: true,
                    isPrimary: true,
                    likes: true,
                    userIdLiked: true,
                    createdAt: true,
                  },
                },
                _count: {
                  select: {
                    SavedSpot: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Format the response to match UserData interface
    const formattedData = {
      id: userData.id,
      email: userData.email,
      username: userData.username,
      bio: userData.bio,
      avatarUrl: userData.avatarUrl,
      spots: userData.spots.map((spot) => ({
        id: spot.id,
        title: spot.title,
        latitude: Number(spot.latitude),
        longitude: Number(spot.longitude),
        category: spot.category.name,
        categoryId: spot.category.id,
        tags: spot.spotTags.map((st) => st.tag),
        user: spot.user,
        createdAt: spot.createdAt.toISOString(),
        photos: spot.photos,
        SavedSpotCount: spot._count.SavedSpot,
      })),
      photos: userData.photos,
      SavedSpots: userData.SavedSpots.map((saved) => ({
        id: saved.spot.id,
        title: saved.spot.title,
        latitude: Number(saved.spot.latitude),
        longitude: Number(saved.spot.longitude),
        category: saved.spot.category.name,
        categoryId: saved.spot.category.id,
        tags: saved.spot.spotTags.map((st) => st.tag),
        user: saved.spot.user,
        createdAt: saved.spot.createdAt.toISOString(),
        photos: saved.spot.photos,
        SavedSpotCount: saved.spot._count.SavedSpot,
      })),
    };
    console.log(formattedData);
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching user spots:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch user spots",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
