import { env } from "@/env";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(String(env.ADMIN_PASSWORD), 10);

  await prisma.user.upsert({
    where: {
      username: String(env.ADMIN_USERNAME),
    },
    update: {},
    create: {
      username: String(env.ADMIN_USERNAME),
      password: hashedPassword,
      email: String(env.ADMIN_EMAIL),
      firstName: String(env.ADMIN_FIRST_NAME),
      lastName: String(env.ADMIN_LAST_NAME),
    },
  });
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
