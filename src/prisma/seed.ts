import { PrismaClient, Role } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create sample users (these would normally be created via Clerk)
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      clerkId: "clerk_admin_id",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      role: Role.ADMIN,
    },
  })

  const editorUser = await prisma.user.upsert({
    where: { email: "editor@example.com" },
    update: {},
    create: {
      clerkId: "clerk_editor_id",
      email: "editor@example.com",
      firstName: "Editor",
      lastName: "User",
      role: Role.EDITOR,
    },
  })

  const regularUser = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      clerkId: "clerk_user_id",
      email: "user@example.com",
      firstName: "Regular",
      lastName: "User",
      role: Role.USER,
    },
  })

  // Create sample posts
  await prisma.post.createMany({
    data: [
      {
        title: "Welcome to the Platform",
        content: "This is a sample post created by the admin.",
        published: true,
        authorId: adminUser.id,
      },
      {
        title: "Editor Guidelines",
        content: "Guidelines for editors on content creation.",
        published: true,
        authorId: editorUser.id,
      },
      {
        title: "User Introduction",
        content: "A post from a regular user.",
        published: false,
        authorId: regularUser.id,
      },
    ],
  })

  console.log("✅ Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
