/*
  Warnings:

  - You are about to drop the column `pessoa_id` on the `Contato` table. All the data in the column will be lost.
  - Added the required column `contato_pessoa_id` to the `Contato` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contato" DROP CONSTRAINT "Contato_pessoa_id_fkey";

-- AlterTable
ALTER TABLE "Contato" DROP COLUMN "pessoa_id",
ADD COLUMN     "contato_pessoa_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_contato_pessoa_id_fkey" FOREIGN KEY ("contato_pessoa_id") REFERENCES "Pessoa"("pessoa_id") ON DELETE RESTRICT ON UPDATE CASCADE;
