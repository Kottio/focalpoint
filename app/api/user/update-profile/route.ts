import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Get session from Better Auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { username, bio, socialLinks } = body;

    // Validate username is unique if provided
    if (username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser && existingUser.id !== session.user.id) {
        return Response.json(
          { message: "Username already taken" },
          { status: 400 }
        );
      }
    }

    // Update user using only the ID from session
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        username: username || null,
        bio: bio || null,
        socialLinks: socialLinks || null,
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Profile update error:", error);
    return Response.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
