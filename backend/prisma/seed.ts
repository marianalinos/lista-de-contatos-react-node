import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pessoa1 = await prisma.pessoa.create({
    data: {
      pessoa_nome: 'João Silva',
      pessoa_cpf: '123.456.789-00',
      contatos: {
        create: [
          {
            contato_tipo: true,
            contato_descricao: 'joao.silva@example.com',
          },
          {
            contato_tipo: false,
            contato_descricao: '5511912345678',
          },
        ],
      },
    },
  });

  const pessoa2 = await prisma.pessoa.create({
    data: {
      pessoa_nome: 'Maria Oliveira',
      pessoa_cpf: '987.654.321-00',
      contatos: {
        create: [
          {
            contato_tipo: true,
            contato_descricao: 'maria.oliveira@example.com',
          },
        ],
      },
    },
  });

}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
