/*
  Warnings:

  - The `statut` column on the `Paiement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `NewsLetterAbonne` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StatutPaiement" AS ENUM ('EN_ATTENTE', 'REUSSI', 'ECHOUE', 'REMBOURSE');

-- AlterTable
ALTER TABLE "Paiement" DROP COLUMN "statut",
ADD COLUMN     "statut" "StatutPaiement" NOT NULL DEFAULT 'EN_ATTENTE';

-- DropTable
DROP TABLE "NewsLetterAbonne";

-- CreateTable
CREATE TABLE "NewsletterAbonne" (
    "id_abonne" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "date_inscription" TIMESTAMP(3) NOT NULL,
    "consentement" BOOLEAN NOT NULL,

    CONSTRAINT "NewsletterAbonne_pkey" PRIMARY KEY ("id_abonne")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterAbonne_email_key" ON "NewsletterAbonne"("email");
