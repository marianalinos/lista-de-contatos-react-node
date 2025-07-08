-- DropForeignKey
ALTER TABLE "Contato" DROP CONSTRAINT "Contato_contato_pessoa_id_fkey";

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_contato_pessoa_id_fkey" FOREIGN KEY ("contato_pessoa_id") REFERENCES "Pessoa"("pessoa_id") ON DELETE CASCADE ON UPDATE CASCADE;
