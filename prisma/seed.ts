import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Create photography-focused categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        slug: "portrait",
        name: "Portrait",
        description: "People photography and headshots",
        icon: "👤",
      },
    }),
    prisma.category.create({
      data: {
        slug: "street",
        name: "Street",
        description: "Urban candid photography",
        icon: "🚶",
      },
    }),
    prisma.category.create({
      data: {
        slug: "landscape",
        name: "Landscape",
        description: "Natural scenery and outdoor views",
        icon: "🏔️",
      },
    }),
    prisma.category.create({
      data: {
        slug: "architecture",
        name: "Architecture",
        description: "Buildings and structural photography",
        icon: "🏗️",
      },
    }),
    prisma.category.create({
      data: {
        slug: "wildlife",
        name: "Wildlife",
        description: "Animals and nature photography",
        icon: "🦅",
      },
    }),
    prisma.category.create({
      data: {
        slug: "macro",
        name: "Macro",
        description: "Close-up and detail photography",
        icon: "🔍",
      },
    }),
    prisma.category.create({
      data: {
        slug: "night",
        name: "Night",
        description: "Low light and astrophotography",
        icon: "🌙",
      },
    }),
    prisma.category.create({
      data: {
        slug: "abstract",
        name: "Abstract",
        description: "Artistic and conceptual photography",
        icon: "🎨",
      },
    }),
    prisma.category.create({
      data: {
        slug: "gems",
        name: "Gems",
        description: "Unique and uncategorizable special spots",
        icon: "💎",
      },
    }),
  ]);

  console.log("Categories created:", categories.length);

  // Create photography-focused tags
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: "BW wonder",
        color: "#2C3E50",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Analog film",
        color: "#E67E22",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Color explosion",
        color: "#E74C3C",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Mystery",
        color: "#8E44AD",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Grandiose",
        color: "#2980B9",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Astro",
        color: "#34495E",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Macro worlds",
        color: "#27AE60",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Portrait",
        color: "#F39C12",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Street",
        color: "#95A5A6",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Abandoned",
        color: "#7F8C8D",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Animal",
        color: "#16A085",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Golden hour",
        color: "#F1C40F",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Moody",
        color: "#34495E",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Reflections",
        color: "#3498DB",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Silhouettes",
        color: "#2C3E50",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Vintage vibes",
        color: "#D35400",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Minimalist",
        color: "#BDC3C7",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Dramatic sky",
        color: "#9B59B6",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Neon lights",
        color: "#E91E63",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Seasonal",
        color: "#4CAF50",
      },
    }),
    prisma.tag.create({
      data: {
        name: "Hidden gem",
        color: "#795548",
      },
    }),
  ]);

  console.log("Tags created:", tags.length);

  // Create sample user
  const user = await prisma.user.create({
    data: {
      email: "demo@example.com",
      username: "demo_user",
      fullName: "Demo User",
      bio: "Sample user for testing",
    },
  });

  console.log("User created:", user.username);
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
