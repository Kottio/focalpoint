import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.json(
      { error: "No session initiated" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const para = await params;
  const spotId = parseInt(para.id);
  const body = await request.json();

  try {
    const photoBatch = await prisma.photoBatch.create({
      data: {
        title: body.title || null,
        description: body.description || null,
        spotId: spotId,
        userId: userId,
        photos: {
          create: body.photos.map((photo: any) => ({
            originalUrl: photo.originalUrl,
            publicId: photo.publicId,
            mediumUrl: photo.mediumUrl,
            thumbnailUrl: photo.thumbnailUrl,
            spotId: spotId,
            userId: userId,
          })),
        },
      },
      include: {
        photos: true,
      },
    });

    return NextResponse.json(photoBatch, { status: 201 });
  } catch (error) {
    console.error("Failed to create photo batch:", error);
    return NextResponse.json(
      { error: "Failed to create photo batch" },
      { status: 500 }
    );
  }
}
