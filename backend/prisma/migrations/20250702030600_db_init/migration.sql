-- CreateTable
CREATE TABLE "Pessoa" (
    "pessoa_id" SERIAL NOT NULL,
    "pessoa_cpf" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("pessoa_id")
);

-- CreateTable
CREATE TABLE "Contato" (
    "contato_id" SERIAL NOT NULL,
    "contato_tipo" BOOLEAN NOT NULL,
    "contato_descricao" TEXT NOT NULL,
    "pessoa_id" INTEGER NOT NULL,

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("contato_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_pessoa_cpf_key" ON "Pessoa"("pessoa_cpf");

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "Pessoa"("pessoa_id") ON DELETE RESTRICT ON UPDATE CASCADE;
