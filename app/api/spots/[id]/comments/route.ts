import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Check authentication - User must be logged in
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to comment." },
        { status: 401 }
      );
    }

    // 2. Get spot ID from URL params
    const para = await params;
    const spotId = parseInt(para.id);

    if (isNaN(spotId)) {
      return NextResponse.json({ error: "Invalid spot ID" }, { status: 400 });
    }

    // 3. Get comment text from request body
    const body = await request.json();
    const { comment } = body;

    // 4. Validate comment
    if (!comment || typeof comment !== "string") {
      return NextResponse.json(
        { error: "Comment text is required" },
        { status: 400 }
      );
    }

    if (comment.trim().length === 0) {
      return NextResponse.json(
        { error: "Comment cannot be empty" },
        { status: 400 }
      );
    }

    if (comment.length > 2000) {
      return NextResponse.json(
        { error: "Comment is too long (max 2000 characters)" },
        { status: 400 }
      );
    }

    // 5. Check if spot exists
    const spotExists = await prisma.spot.findUnique({
      where: { id: spotId },
      select: { id: true },
    });

    if (!spotExists) {
      return NextResponse.json({ error: "Spot not found" }, { status: 404 });
    }

    // 6. Create the comment in database
    const newComment = await prisma.spotComment.create({
      data: {
        comment: comment.trim(),
        spotId: spotId,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
      },
    });

    // 7. Return success response with the created comment
    return NextResponse.json(
      {
        message: "Comment created successfully",
        comment: newComment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      {
        error: "Failed to create comment",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
