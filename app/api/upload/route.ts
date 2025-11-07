import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("photo") as unknown as File;
    const spotId = data.get("spotId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type (basic image check)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    // TODO: Convert all photos
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64 for Cloudinary
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Generate unique public_id
    const timestamp = Date.now();
    const publicId = `focal-point/spots/${spotId}/photo_${timestamp}`;

    // Upload original to Cloudinary
    const originalUpload = await cloudinary.uploader.upload(base64Image, {
      public_id: publicId,
      folder: "focal-point/spots/original",
      resource_type: "image",
      overwrite: false,
    });

    // Generate medium size (300x200 for cards)
    const mediumUpload = await cloudinary.uploader.upload(base64Image, {
      public_id: `${publicId}_medium`,
      folder: "focal-point/spots/medium",
      transformation: [
        { width: 300, height: 200, crop: "fill", gravity: "center" },
      ],
      resource_type: "image",
      overwrite: false,
    });

    return NextResponse.json({
      success: true,
      originalUrl: originalUpload.secure_url,

      mediumUrl: mediumUpload.secure_url,
      publicId: publicId,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
