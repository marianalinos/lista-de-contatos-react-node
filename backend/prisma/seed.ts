import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  
  // Seed para User
  await prisma.user.createMany({
    data: [
      {
        user_email: 'joao@gmail.com',
        user_secret: 'hash_da_senha',
      },
      {
        user_email: 'maria@gmail.com',
        user_secret: 'hash_da_senha',
      },
    ],
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
