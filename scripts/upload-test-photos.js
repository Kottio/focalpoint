const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../app/generated/prisma/index.js');

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadTestPhotos() {
  try {
    const mainPhotosDir = './public/mainPhotos';
    
    if (!fs.existsSync(mainPhotosDir)) {
      console.log('mainPhotos directory not found');
      return;
    }

    const files = fs.readdirSync(mainPhotosDir)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .slice(0, 4); // Take first 4 photos

    console.log(`Found ${files.length} photos to upload...`);

    // Get demo user
    let demoUser = await prisma.user.findFirst({
      where: { username: 'demo_user' }
    });

    if (!demoUser) {
      console.log('Demo user not found, creating one...');
      demoUser = await prisma.user.create({
        data: {
          email: 'demo@example.com',
          username: 'demo_user',
          fullName: 'Demo User'
        }
      });
    }

    // Get ALL spots to assign photos to
    const spots = await prisma.spot.findMany({
      orderBy: { id: 'asc' }
    });

    console.log(`Assigning photos to all ${spots.length} spots (cycling through ${files.length} images)...`);

    for (let i = 0; i < spots.length; i++) {
      const fileIndex = i % files.length; // Cycle through the 4 images
      const file = files[fileIndex];
      const spot = spots[i];
      const filePath = path.join(mainPhotosDir, file);
      
      console.log(`\nUploading ${file} for "${spot.title}"...`);

      // Generate unique public_id
      const publicId = `focal-point/spots/${spot.id}/photo_${Date.now()}`;

      try {
        // Upload original to Cloudinary
        const originalUpload = await cloudinary.uploader.upload(filePath, {
          public_id: publicId,
          folder: 'focal-point/spots/original',
          resource_type: 'image',
          overwrite: false
        });

        // Generate thumbnail (40x40 for map markers)
        const thumbnailUpload = await cloudinary.uploader.upload(filePath, {
          public_id: `${publicId}_thumb`,
          folder: 'focal-point/spots/thumbnails',
          transformation: [
            { width: 40, height: 40, crop: 'fill', gravity: 'center' }
          ],
          resource_type: 'image',
          overwrite: false
        });

        // Generate medium size (300x200 for cards)
        const mediumUpload = await cloudinary.uploader.upload(filePath, {
          public_id: `${publicId}_medium`,
          folder: 'focal-point/spots/medium',
          transformation: [
            { width: 300, height: 200, crop: 'fill', gravity: 'center' }
          ],
          resource_type: 'image',
          overwrite: false
        });

        // Save to database with all URLs
        await prisma.photo.create({
          data: {
            originalUrl: originalUpload.secure_url,
            thumbnailUrl: thumbnailUpload.secure_url,
            mediumUrl: mediumUpload.secure_url,
            publicId: publicId,
            isPrimary: true,
            title: `Photo for ${spot.title}`,
            likes: Math.floor(Math.random() * 20), // Random likes for testing
            spotId: spot.id,
            userId: demoUser.id
          }
        });

        console.log(`✅ Uploaded ${file} successfully`);
        console.log(`   Original: ${originalUpload.secure_url}`);
        console.log(`   Thumbnail: ${thumbnailUpload.secure_url}`);
        console.log(`   Medium: ${mediumUpload.secure_url}`);

      } catch (uploadError) {
        console.error(`❌ Failed to upload ${file}:`, uploadError.message);
      }
    }

    console.log('\n🎉 Test photo upload completed!');

  } catch (error) {
    console.error('Error uploading test photos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

uploadTestPhotos();