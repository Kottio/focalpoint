import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  try {
    // Get comment ID from params
    const para = await params;
    const commentId = parseInt(para.commentId);

    if (isNaN(commentId)) {
      return NextResponse.json(
        { error: "Invalid comment ID" },
        { status: 400 }
      );
    }

    // Increment the likes count
    const updatedComment = await prisma.spotComment.update({
      where: { id: commentId },
      data: {
        likes: {
          increment: 1,
        },
      },
      select: {
        id: true,
        likes: true,
      },
    });

    return NextResponse.json({
      success: true,
      commentId: updatedComment.id,
      likes: updatedComment.likes,
    });
  } catch (error) {
    console.error("Error liking comment:", error);
    return NextResponse.json(
      {
        error: "Failed to like comment",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
