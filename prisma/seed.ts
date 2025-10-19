import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@email.com";

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin@123", 10);

    await prisma.user.create({
      data: {
        name: "Salisu Iliyasu",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("✅ Admin user created:", adminEmail);
  } else {
    console.log("⚠️ Admin user already exists");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
