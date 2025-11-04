import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const para = await params;
  const photoId = parseInt(para.id);

  const body = await request.json();
  const { userIdLiked } = body;

  const photo = await prisma.photo.findUnique({
    where: { id: photoId },
    select: { id: true, likes: true, userIdLiked: true },
  });

  if (!photo) {
    return NextResponse.json({ error: "Photo not found" }, { status: 404 });
  }

  if (photo.userIdLiked.includes(userIdLiked)) {
    return NextResponse.json({ error: "User Already liked" }, { status: 400 });
  }

  await prisma.photo.update({
    where: { id: photoId },
    data: {
      likes: { increment: 1 },
      userIdLiked: {
        push: userIdLiked,
      },
    },
  });

  return NextResponse.json(
    {
      success: true,
    },
    { status: 200 }
  );
}
