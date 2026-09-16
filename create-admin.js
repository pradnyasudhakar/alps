const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const existing = await prisma.user.findUnique({
    where: { email: "admin@alps.com" },
  });

  if (existing) {
    console.log("Admin already exists:", existing.email);
    return;
  }

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@alps.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Admin created successfully:", admin.email);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());