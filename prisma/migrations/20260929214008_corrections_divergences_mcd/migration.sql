/*
  Warnings:

  - You are about to drop the `newsLetterAbonne` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mail]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_id_utilisateur_admin_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_id_utilisateur_client_connectee_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_utilisateur_fkey";

-- AlterTable
ALTER TABLE "Commande" ALTER COLUMN "id_utilisateur_admin" DROP NOT NULL,
ALTER COLUMN "id_utilisateur_client_connectee" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "id_utilisateur" DROP NOT NULL;

-- DropTable
DROP TABLE "newsLetterAbonne";

-- CreateTable
CREATE TABLE "NewsLetterAbonne" (
    "id_abonne" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "date_inscription" TIMESTAMP(3) NOT NULL,
    "consentement" BOOLEAN NOT NULL,

    CONSTRAINT "NewsLetterAbonne_pkey" PRIMARY KEY ("id_abonne")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsLetterAbonne_email_key" ON "NewsLetterAbonne"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_mail_key" ON "Utilisateur"("mail");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_utilisateur_admin_fkey" FOREIGN KEY ("id_utilisateur_admin") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_utilisateur_client_connectee_fkey" FOREIGN KEY ("id_utilisateur_client_connectee") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;
