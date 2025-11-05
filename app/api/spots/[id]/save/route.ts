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
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to save spots." },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const para = await params;
    const spotId = parseInt(para.id);

    if (isNaN(spotId)) {
      return NextResponse.json({ error: "Invalid spot ID" }, { status: 400 });
    }

    console.log(
      "Intent to save Spot",
      spotId,
      "With user",
      session.user.username
    );

    const spotAlreadySaved = await prisma.savedSpot.findUnique({
      where: {
        userId_spotId: {
          userId: userId,
          spotId: spotId,
        },
      },
    });

    if (spotAlreadySaved) {
      // Unsave - delete the saved spot
      await prisma.savedSpot.delete({
        where: {
          userId_spotId: {
            userId: userId,
            spotId: spotId,
          },
        },
      });
      return NextResponse.json({ saved: false }, { status: 200 });
    } else {
      // Save the spot
      await prisma.savedSpot.create({
        data: {
          userId: userId,
          spotId: spotId,
        },
      });
      return NextResponse.json({ saved: true }, { status: 201 });
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to save spot",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
