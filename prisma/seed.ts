import { PrismaClient } from '../app/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        slug: 'urban',
        name: 'Urban',
        description: 'City locations and urban spots',
        icon: '⛪︎'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'coastal',
        name: 'Coastal',
        description: 'Beach and coastal areas',
        icon: '⛵︎'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'mountain',
        name: 'Mountain',
        description: 'Mountain and hiking spots',
        icon: '⛰'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'forest',
        name: 'Forest',
        description: 'Forest and nature spots',
        icon: '𐂷'
      }
    })
  ]);

  console.log('Categories created:', categories.length);

  // Create tags
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: 'Photography',
        color: '#FF6B6B'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Hiking',
        color: '#4ECDC4'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Family Friendly',
        color: '#45B7D1'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Scenic View',
        color: '#96CEB4'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Restaurant',
        color: '#FFEAA7'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Historic',
        color: '#DDA0DD'
      }
    })
  ]);

  console.log('Tags created:', tags.length);

  // Create sample user
  const user = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      username: 'demo_user',
      fullName: 'Demo User',
      bio: 'Sample user for testing'
    }
  });

  console.log('User created:', user.username);

  // Create sample spots around Paris area
  const spots = await Promise.all([
    prisma.spot.create({
      data: {
        title: 'Eiffel Tower',
        description: 'Iconic iron tower and symbol of Paris',
        latitude: 48.8584,
        longitude: 2.2945,
        userId: user.id,
        categoryId: categories[0].id, // Urban
        spotTags: {
          create: [
            { tagId: tags[0].id }, // Photography
            { tagId: tags[3].id }, // Scenic View
            { tagId: tags[5].id }  // Historic
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Louvre Museum',
        description: 'World famous art museum',
        latitude: 48.8606,
        longitude: 2.3376,
        userId: user.id,
        categoryId: categories[0].id, // Urban
        spotTags: {
          create: [
            { tagId: tags[2].id }, // Family Friendly
            { tagId: tags[5].id }  // Historic
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Sacré-Cœur Basilica',
        description: 'Beautiful basilica with panoramic views',
        latitude: 48.8867,
        longitude: 2.3431,
        userId: user.id,
        categoryId: categories[0].id, // Urban
        spotTags: {
          create: [
            { tagId: tags[0].id }, // Photography
            { tagId: tags[3].id }, // Scenic View
            { tagId: tags[5].id }  // Historic
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Bois de Vincennes',
        description: 'Large public park in eastern Paris',
        latitude: 48.8280,
        longitude: 2.4324,
        userId: user.id,
        categoryId: categories[3].id, // Forest
        spotTags: {
          create: [
            { tagId: tags[1].id }, // Hiking
            { tagId: tags[2].id }  // Family Friendly
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Montmartre',
        description: 'Historic hilltop district with artist studios',
        latitude: 48.8848,
        longitude: 2.3469,
        userId: user.id,
        categoryId: categories[0].id, // Urban
        spotTags: {
          create: [
            { tagId: tags[0].id }, // Photography
            { tagId: tags[3].id }, // Scenic View
            { tagId: tags[5].id }  // Historic
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Seine River Banks',
        description: 'Beautiful riverside walking paths',
        latitude: 48.8566,
        longitude: 2.3522,
        userId: user.id,
        categoryId: categories[1].id, // Coastal
        spotTags: {
          create: [
            { tagId: tags[0].id }, // Photography
            { tagId: tags[2].id }, // Family Friendly
            { tagId: tags[3].id }  // Scenic View
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Café de Flore',
        description: 'Famous historic café in Saint-Germain',
        latitude: 48.8542,
        longitude: 2.3320,
        userId: user.id,
        categoryId: categories[0].id, // Urban
        spotTags: {
          create: [
            { tagId: tags[4].id }, // Restaurant
            { tagId: tags[5].id }  // Historic
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Parc des Buttes-Chaumont',
        description: 'Hilly park with lake and waterfalls',
        latitude: 48.8799,
        longitude: 2.3822,
        userId: user.id,
        categoryId: categories[3].id, // Forest
        spotTags: {
          create: [
            { tagId: tags[1].id }, // Hiking
            { tagId: tags[2].id }, // Family Friendly
            { tagId: tags[3].id }  // Scenic View
          ]
        }
      }
    })
  ]);

  console.log('Spots created:', spots.length);
  console.log('Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });