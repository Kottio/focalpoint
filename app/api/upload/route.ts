import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('photo') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type (basic image check)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize filename
    const filename = `spot_${timestamp}_${originalName}`;
    
    // Ensure upload directories exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'spots');
    const fullDir = path.join(uploadDir, 'full');
    const thumbnailDir = path.join(uploadDir, 'thumbnails');
    
    if (!existsSync(fullDir)) {
      await mkdir(fullDir, { recursive: true });
    }
    if (!existsSync(thumbnailDir)) {
      await mkdir(thumbnailDir, { recursive: true });
    }
    
    // Save full size image
    const fullPath = path.join(fullDir, filename);
    await writeFile(fullPath, buffer);
    
    // TODO: Generate thumbnail (40x40) for map markers
    // This would be replaced by Cloudinary's automatic resizing later
    
    const publicUrl = `/uploads/spots/full/${filename}`;
    
    return NextResponse.json({ 
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: "Upload failed" 
    }, { status: 500 });
  }
}

// Optional: Handle other methods
export async function GET() {
  return NextResponse.json({ 
    message: "Upload endpoint - use POST to upload photos" 
  });
}