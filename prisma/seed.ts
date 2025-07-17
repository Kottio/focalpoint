import { PrismaClient } from '../app/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create categories with updated names and icons
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        slug: 'forest',
        name: 'Forest',
        description: 'Forest and woodland areas',
        icon: '🌲'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'river-lake',
        name: 'River/Lake',
        description: 'Rivers, lakes, and water bodies',
        icon: '🏞️'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'beach-coast',
        name: 'Beach/Coast',
        description: 'Beach and coastal areas',
        icon: '🏖️'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'mountain-hill',
        name: 'Mountain/Hill',
        description: 'Mountains, hills, and elevated areas',
        icon: '⛰️'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'garden-park',
        name: 'Garden/Park',
        description: 'Parks, gardens, and cultivated green spaces',
        icon: '🌳'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'structure',
        name: 'Structure',
        description: 'Buildings, monuments, and architectural sites',
        icon: '🏛️'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'underground',
        name: 'Underground',
        description: 'Underground spaces, tunnels, and subterranean areas',
        icon: '🕳️'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'urban',
        name: 'Urban',
        description: 'City streets, squares, and urban environments',
        icon: '🏙️'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'cave',
        name: 'Cave',
        description: 'Natural caves and rock formations',
        icon: '🕳️'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'desert',
        name: 'Desert',
        description: 'Desert landscapes and arid environments',
        icon: '🏜️'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'religious-site',
        name: 'Religious Site',
        description: 'Churches, temples, and religious buildings',
        icon: '⛪'
      }
    }),
    prisma.category.create({
      data: {
        slug: 'bridges',
        name: 'Bridges',
        description: 'Bridges and crossing structures',
        icon: '🌉'
      }
    })
  ]);

  console.log('Categories created:', categories.length);

  // Create photography-focused tags
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: 'BW wonder',
        color: '#2C3E50'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Analog film',
        color: '#E67E22'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Color explosion',
        color: '#E74C3C'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Mystery',
        color: '#8E44AD'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Grandiose',
        color: '#2980B9'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Astro',
        color: '#34495E'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Macro worlds',
        color: '#27AE60'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Portrait',
        color: '#F39C12'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Street',
        color: '#95A5A6'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Abandoned',
        color: '#7F8C8D'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Animal',
        color: '#16A085'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Golden hour',
        color: '#F1C40F'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Moody',
        color: '#34495E'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Reflections',
        color: '#3498DB'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Silhouettes',
        color: '#2C3E50'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Vintage vibes',
        color: '#D35400'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Minimalist',
        color: '#BDC3C7'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Dramatic sky',
        color: '#9B59B6'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Neon lights',
        color: '#E91E63'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Seasonal',
        color: '#4CAF50'
      }
    }),
    prisma.tag.create({
      data: {
        name: 'Hidden gem',
        color: '#795548'
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

  // Create diverse spots around Paris with realistic photography locations
  const spots = await Promise.all([
    // Urban spots
    prisma.spot.create({
      data: {
        title: 'Eiffel Tower',
        description: 'Iconic iron tower with multiple photography angles',
        latitude: 48.8584,
        longitude: 2.2945,
        userId: user.id,
        categoryId: categories[5].id, // Structure
        spotTags: {
          create: [
            { tagId: tags[11].id }, // Golden hour
            { tagId: tags[4].id },  // Grandiose
            { tagId: tags[14].id }  // Silhouettes
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Montmartre Streets',
        description: 'Cobblestone streets perfect for street photography',
        latitude: 48.8848,
        longitude: 2.3469,
        userId: user.id,
        categoryId: categories[7].id, // Urban
        spotTags: {
          create: [
            { tagId: tags[8].id },  // Street
            { tagId: tags[15].id }, // Vintage vibes
            { tagId: tags[7].id }   // Portrait
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Le Marais at Night',
        description: 'Historic district with atmospheric lighting',
        latitude: 48.8566,
        longitude: 2.3522,
        userId: user.id,
        categoryId: categories[7].id, // Urban
        spotTags: {
          create: [
            { tagId: tags[18].id }, // Neon lights
            { tagId: tags[12].id }, // Moody
            { tagId: tags[3].id }   // Mystery
          ]
        }
      }
    }),

    // Religious sites
    prisma.spot.create({
      data: {
        title: 'Sacré-Cœur Basilica',
        description: 'Beautiful basilica with dramatic architecture',
        latitude: 48.8867,
        longitude: 2.3431,
        userId: user.id,
        categoryId: categories[10].id, // Religious site
        spotTags: {
          create: [
            { tagId: tags[0].id },  // BW wonder
            { tagId: tags[17].id }, // Dramatic sky
            { tagId: tags[4].id }   // Grandiose
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Sainte-Chapelle',
        description: 'Gothic chapel with stunning stained glass',
        latitude: 48.8554,
        longitude: 2.3450,
        userId: user.id,
        categoryId: categories[10].id, // Religious site
        spotTags: {
          create: [
            { tagId: tags[2].id },  // Color explosion
            { tagId: tags[16].id }, // Minimalist
            { tagId: tags[20].id }  // Hidden gem
          ]
        }
      }
    }),

    // Bridges
    prisma.spot.create({
      data: {
        title: 'Pont des Arts',
        description: 'Pedestrian bridge with Seine views',
        latitude: 48.8583,
        longitude: 2.3374,
        userId: user.id,
        categoryId: categories[11].id, // Bridges
        spotTags: {
          create: [
            { tagId: tags[13].id }, // Reflections
            { tagId: tags[11].id }, // Golden hour
            { tagId: tags[14].id }  // Silhouettes
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Pont Neuf',
        description: 'Historic stone bridge, oldest in Paris',
        latitude: 48.8566,
        longitude: 2.3414,
        userId: user.id,
        categoryId: categories[11].id, // Bridges
        spotTags: {
          create: [
            { tagId: tags[1].id },  // Analog film
            { tagId: tags[15].id }, // Vintage vibes
            { tagId: tags[8].id }   // Street
          ]
        }
      }
    }),

    // Garden/Park
    prisma.spot.create({
      data: {
        title: 'Tuileries Garden',
        description: 'Formal garden with sculptures and pathways',
        latitude: 48.8634,
        longitude: 2.3275,
        userId: user.id,
        categoryId: categories[4].id, // Garden/Park
        spotTags: {
          create: [
            { tagId: tags[19].id }, // Seasonal
            { tagId: tags[16].id }, // Minimalist
            { tagId: tags[7].id }   // Portrait
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Luxembourg Gardens',
        description: 'Beautiful park with palace and pond',
        latitude: 48.8462,
        longitude: 2.3371,
        userId: user.id,
        categoryId: categories[4].id, // Garden/Park
        spotTags: {
          create: [
            { tagId: tags[13].id }, // Reflections
            { tagId: tags[11].id }, // Golden hour
            { tagId: tags[6].id }   // Macro worlds
          ]
        }
      }
    }),

    // Forest
    prisma.spot.create({
      data: {
        title: 'Bois de Vincennes',
        description: 'Large forest park with diverse wildlife',
        latitude: 48.8280,
        longitude: 2.4324,
        userId: user.id,
        categoryId: categories[0].id, // Forest
        spotTags: {
          create: [
            { tagId: tags[10].id }, // Animal
            { tagId: tags[6].id },  // Macro worlds
            { tagId: tags[19].id }  // Seasonal
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Bois de Boulogne',
        description: 'Western forest with lakes and meadows',
        latitude: 48.8625,
        longitude: 2.2644,
        userId: user.id,
        categoryId: categories[0].id, // Forest
        spotTags: {
          create: [
            { tagId: tags[12].id }, // Moody
            { tagId: tags[3].id },  // Mystery
            { tagId: tags[1].id }   // Analog film
          ]
        }
      }
    }),

    // River/Lake
    prisma.spot.create({
      data: {
        title: 'Seine at Île Saint-Louis',
        description: 'Peaceful river spot with historic island views',
        latitude: 48.8516,
        longitude: 2.3564,
        userId: user.id,
        categoryId: categories[1].id, // River/Lake
        spotTags: {
          create: [
            { tagId: tags[13].id }, // Reflections
            { tagId: tags[15].id }, // Vintage vibes
            { tagId: tags[12].id }  // Moody
          ]
        }
      }
    }),

    // Underground
    prisma.spot.create({
      data: {
        title: 'Catacombs of Paris',
        description: 'Underground ossuary with unique atmosphere',
        latitude: 48.8338,
        longitude: 2.3324,
        userId: user.id,
        categoryId: categories[6].id, // Underground
        spotTags: {
          create: [
            { tagId: tags[3].id },  // Mystery
            { tagId: tags[0].id },  // BW wonder
            { tagId: tags[12].id }  // Moody
          ]
        }
      }
    }),
    prisma.spot.create({
      data: {
        title: 'Châtelet Metro Station',
        description: 'Historic underground station with unique architecture',
        latitude: 48.8583,
        longitude: 2.3478,
        userId: user.id,
        categoryId: categories[6].id, // Underground
        spotTags: {
          create: [
            { tagId: tags[8].id },  // Street
            { tagId: tags[16].id }, // Minimalist
            { tagId: tags[18].id }  // Neon lights
          ]
        }
      }
    }),

    // Mountain/Hill
    prisma.spot.create({
      data: {
        title: 'Parc des Buttes-Chaumont',
        description: 'Hilly park with cliffs and waterfalls',
        latitude: 48.8799,
        longitude: 2.3822,
        userId: user.id,
        categoryId: categories[3].id, // Mountain/Hill
        spotTags: {
          create: [
            { tagId: tags[4].id },  // Grandiose
            { tagId: tags[17].id }, // Dramatic sky
            { tagId: tags[20].id }  // Hidden gem
          ]
        }
      }
    }),

    // Abandoned
    prisma.spot.create({
      data: {
        title: 'Petite Ceinture Railway',
        description: 'Abandoned railway line now reclaimed by nature',
        latitude: 48.8456,
        longitude: 2.3312,
        userId: user.id,
        categoryId: categories[7].id, // Urban
        spotTags: {
          create: [
            { tagId: tags[9].id },  // Abandoned
            { tagId: tags[3].id },  // Mystery
            { tagId: tags[20].id }  // Hidden gem
          ]
        }
      }
    }),

    // Astro spots
    prisma.spot.create({
      data: {
        title: 'Trocadéro Observatory Spot',
        description: 'Open area with clear night sky views',
        latitude: 48.8620,
        longitude: 2.2874,
        userId: user.id,
        categoryId: categories[4].id, // Garden/Park
        spotTags: {
          create: [
            { tagId: tags[5].id },  // Astro
            { tagId: tags[17].id }, // Dramatic sky
            { tagId: tags[14].id }  // Silhouettes
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