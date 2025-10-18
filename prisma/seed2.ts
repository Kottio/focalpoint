import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Create sample user
  const user = await prisma.user.create({
    data: {
      id: "1",
      email: "demo@example2.com",
      username: "demo_user2",
      fullName: "Demo User2",
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
