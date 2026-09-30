/*
  Warnings:

  - The values [REUSSI,ECHOUE,REMBOURSE] on the enum `StatutPaiement` will be removed. If these variants are still used in the database, this will fail.
  - The `statut` column on the `Commande` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[stripe_session_id]` on the table `Paiement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email_contact` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom_contact` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenom_contact` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone_contact` to the `Commande` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatutCommande" AS ENUM ('EN_ATTENTE', 'PAYEE', 'EN_PREPARATION', 'LIVREE', 'ANNULEE', 'ECHOUEE');

-- AlterEnum
BEGIN;
CREATE TYPE "StatutPaiement_new" AS ENUM ('EN_ATTENTE', 'EN_COURS', 'VALIDE', 'REFUSE');
ALTER TABLE "public"."Paiement" ALTER COLUMN "statut" DROP DEFAULT;
ALTER TABLE "Paiement" ALTER COLUMN "statut" TYPE "StatutPaiement_new" USING ("statut"::text::"StatutPaiement_new");
ALTER TYPE "StatutPaiement" RENAME TO "StatutPaiement_old";
ALTER TYPE "StatutPaiement_new" RENAME TO "StatutPaiement";
DROP TYPE "public"."StatutPaiement_old";
ALTER TABLE "Paiement" ALTER COLUMN "statut" SET DEFAULT 'EN_ATTENTE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Adresse" DROP CONSTRAINT "Adresse_id_utilisateur_fkey";

-- DropForeignKey
ALTER TABLE "Avis" DROP CONSTRAINT "Avis_id_utilisateur_admin_fkey";

-- AlterTable
ALTER TABLE "Adresse" ALTER COLUMN "id_utilisateur" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Avis" ALTER COLUMN "commentaire" DROP NOT NULL,
ALTER COLUMN "id_utilisateur_admin" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Commande" ADD COLUMN     "email_contact" TEXT NOT NULL,
ADD COLUMN     "nom_contact" TEXT NOT NULL,
ADD COLUMN     "prenom_contact" TEXT NOT NULL,
ADD COLUMN     "telephone_contact" TEXT NOT NULL,
DROP COLUMN "statut",
ADD COLUMN     "statut" "StatutCommande" NOT NULL DEFAULT 'EN_ATTENTE';

-- AlterTable
ALTER TABLE "Paiement" ADD COLUMN     "stripe_session_id" TEXT,
ALTER COLUMN "date_paiement" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Paiement_stripe_session_id_key" ON "Paiement"("stripe_session_id");

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_id_utilisateur_admin_fkey" FOREIGN KEY ("id_utilisateur_admin") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;
