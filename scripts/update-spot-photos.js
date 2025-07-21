const { PrismaClient } = require('../app/generated/prisma/index.js');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function updateSpotPhotos() {
  try {
    // Get list of thumbnail files
    const thumbnailDir = './public/uploads/spots/thumbnails';
    const thumbnails = fs.existsSync(thumbnailDir) 
      ? fs.readdirSync(thumbnailDir).filter(file => file.startsWith('thumb_'))
      : [];
    
    console.log(`Found ${thumbnails.length} thumbnails`);
    
    // Get all spots from database
    const spots = await prisma.spot.findMany({
      orderBy: { id: 'asc' },
      include: { photos: true, user: true }
    });
    
    console.log(`Found ${spots.length} spots in database`);
    
    // Get or create demo user
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
    
    // Add photos to each spot (cycling through available thumbnails)
    for (let i = 0; i < spots.length; i++) {
      const spot = spots[i];
      
      // Skip if spot already has a primary photo
      if (spot.photos.some(photo => photo.isPrimary)) {
        console.log(`⏭ Skipped "${spot.title}" - already has primary photo`);
        continue;
      }
      
      // Assign photos in round-robin fashion
      if (thumbnails.length > 0) {
        const thumbnailIndex = i % thumbnails.length;
        const thumbnail = thumbnails[thumbnailIndex];
        const photoUrl = `/uploads/spots/thumbnails/${thumbnail}`;
        
        await prisma.photo.create({
          data: {
            url: photoUrl,
            isPrimary: true,
            description: `Primary photo for ${spot.title}`,
            spotId: spot.id,
            userId: demoUser.id
          }
        });
        
        console.log(`✓ Added primary photo to "${spot.title}" with ${thumbnail}`);
      }
    }
    
    console.log('\nDone! All spots updated with photos.');
    
  } catch (error) {
    console.error('Error updating spots:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSpotPhotos();