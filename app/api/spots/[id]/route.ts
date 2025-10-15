import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/index.js";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const para = await params;
  const spotId = parseInt(para.id);

  try {
    const spot = await prisma.spot.findUnique({
      where: {
        id: spotId,
      },
      include: {
        category: true,
        spotTags: {
          include: {
            tag: true,
          },
        },
        photos: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                fullName: true,
              },
            },
          },
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
    });
    if (!spot) {
      return NextResponse.json({ error: "Spot not found" }, { status: 404 });
    }

    const spotDetails = {
      id: spot.id,
      title: spot.title,
      description: spot.description,
      category: spot.category.name,
      categoryId: spot.categoryId,
      tags: spot.spotTags.map((st) => ({
        id: st.tag.id,
        name: st.tag.name,
        color: st.tag.color,
      })),
      fullPhotos:
        spot.photos?.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          originalUrl: p.originalUrl,
          likes: p.likes,
          user: p.user,
          createdAt: p.createdAt,
        })) || [],
      user: spot.user,
      upvotes: spot.votes.length,
      createdAt: spot.createdAt,
    };

    return NextResponse.json(spotDetails);
  } catch (err) {
    console.error("Could not fetch the Details for the spot", spotId, err);
    return NextResponse.json(
      { error: "Failed to fetch spots" },
      { status: 500 }
    );
  }
}
