/*
  Warnings:

  - The primary key for the `Adresse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_utilisateur` column on the `Adresse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Article` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Avis` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_utilisateur_admin` column on the `Avis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Commande` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `montantTotal` on the `Commande` table. All the data in the column will be lost.
  - The `id_utilisateur_admin` column on the `Commande` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id_utilisateur_client_connectee` column on the `Commande` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Favori` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LigneCommande` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `prix_unitaire` on the `LigneCommande` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `sous_total` on the `LigneCommande` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_utilisateur` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `NewsletterAbonne` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Page` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Paiement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `montant` on the `Paiement` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - The primary key for the `PasserellePaiement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `urlWebhook` on the `PasserellePaiement` table. All the data in the column will be lost.
  - The primary key for the `Producteur` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Produit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `prix_unitaire` on the `Produit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - The primary key for the `TraiterPar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Utilisateur` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id_utilisateur,id_produit]` on the table `Favori` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id_adresse` on the `Adresse` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_article` on the `Article` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_utilisateur_admin` on the `Article` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_avis` on the `Avis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_utilisateur_client_connectee` on the `Avis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_ligne` on the `Avis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `montant_total` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id_commande` on the `Commande` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_adresse` on the `Commande` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_favori` on the `Favori` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_utilisateur` on the `Favori` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_produit` on the `Favori` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_ligne` on the `LigneCommande` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_commande` on the `LigneCommande` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_produit` on the `LigneCommande` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_message` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_abonne` on the `NewsletterAbonne` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_page` on the `Page` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_utilisateur_admin` on the `Page` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_paiement` on the `Paiement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_commande` on the `Paiement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `url_webhook` to the `PasserellePaiement` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id_passerelle` on the `PasserellePaiement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_producteur` on the `Producteur` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_utilisateur` on the `Producteur` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_produit` on the `Produit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_producteur` on the `Produit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_paiement` on the `TraiterPar` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_passerelle` on the `TraiterPar` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_utilisateur` on the `Utilisateur` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Adresse" DROP CONSTRAINT "Adresse_id_utilisateur_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_id_utilisateur_admin_fkey";

-- DropForeignKey
ALTER TABLE "Avis" DROP CONSTRAINT "Avis_id_ligne_fkey";

-- DropForeignKey
ALTER TABLE "Avis" DROP CONSTRAINT "Avis_id_utilisateur_admin_fkey";

-- DropForeignKey
ALTER TABLE "Avis" DROP CONSTRAINT "Avis_id_utilisateur_client_connectee_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_id_adresse_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_id_utilisateur_admin_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_id_utilisateur_client_connectee_fkey";

-- DropForeignKey
ALTER TABLE "Favori" DROP CONSTRAINT "Favori_id_produit_fkey";

-- DropForeignKey
ALTER TABLE "Favori" DROP CONSTRAINT "Favori_id_utilisateur_fkey";

-- DropForeignKey
ALTER TABLE "LigneCommande" DROP CONSTRAINT "LigneCommande_id_commande_fkey";

-- DropForeignKey
ALTER TABLE "LigneCommande" DROP CONSTRAINT "LigneCommande_id_produit_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_utilisateur_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_id_utilisateur_admin_fkey";

-- DropForeignKey
ALTER TABLE "Paiement" DROP CONSTRAINT "Paiement_id_commande_fkey";

-- DropForeignKey
ALTER TABLE "Producteur" DROP CONSTRAINT "Producteur_id_utilisateur_fkey";

-- DropForeignKey
ALTER TABLE "Produit" DROP CONSTRAINT "Produit_id_producteur_fkey";

-- DropForeignKey
ALTER TABLE "TraiterPar" DROP CONSTRAINT "TraiterPar_id_paiement_fkey";

-- DropForeignKey
ALTER TABLE "TraiterPar" DROP CONSTRAINT "TraiterPar_id_passerelle_fkey";

-- AlterTable
ALTER TABLE "Adresse" DROP CONSTRAINT "Adresse_pkey",
DROP COLUMN "id_adresse",
ADD COLUMN     "id_adresse" UUID NOT NULL,
DROP COLUMN "id_utilisateur",
ADD COLUMN     "id_utilisateur" UUID,
ADD CONSTRAINT "Adresse_pkey" PRIMARY KEY ("id_adresse");

-- AlterTable
ALTER TABLE "Article" DROP CONSTRAINT "Article_pkey",
DROP COLUMN "id_article",
ADD COLUMN     "id_article" UUID NOT NULL,
ALTER COLUMN "date_publication" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id_utilisateur_admin",
ADD COLUMN     "id_utilisateur_admin" UUID NOT NULL,
ADD CONSTRAINT "Article_pkey" PRIMARY KEY ("id_article");

-- AlterTable
ALTER TABLE "Avis" DROP CONSTRAINT "Avis_pkey",
DROP COLUMN "id_avis",
ADD COLUMN     "id_avis" UUID NOT NULL,
ALTER COLUMN "date_avis" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id_utilisateur_client_connectee",
ADD COLUMN     "id_utilisateur_client_connectee" UUID NOT NULL,
DROP COLUMN "id_utilisateur_admin",
ADD COLUMN     "id_utilisateur_admin" UUID,
DROP COLUMN "id_ligne",
ADD COLUMN     "id_ligne" UUID NOT NULL,
ADD CONSTRAINT "Avis_pkey" PRIMARY KEY ("id_avis");

-- AlterTable
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_pkey",
DROP COLUMN "montantTotal",
ADD COLUMN     "montant_total" DECIMAL(10,2) NOT NULL,
DROP COLUMN "id_commande",
ADD COLUMN     "id_commande" UUID NOT NULL,
ALTER COLUMN "date_commande" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id_adresse",
ADD COLUMN     "id_adresse" UUID NOT NULL,
DROP COLUMN "id_utilisateur_admin",
ADD COLUMN     "id_utilisateur_admin" UUID,
DROP COLUMN "id_utilisateur_client_connectee",
ADD COLUMN     "id_utilisateur_client_connectee" UUID,
ADD CONSTRAINT "Commande_pkey" PRIMARY KEY ("id_commande");

-- AlterTable
ALTER TABLE "Favori" DROP CONSTRAINT "Favori_pkey",
DROP COLUMN "id_favori",
ADD COLUMN     "id_favori" UUID NOT NULL,
ALTER COLUMN "date_ajout" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id_utilisateur",
ADD COLUMN     "id_utilisateur" UUID NOT NULL,
DROP COLUMN "id_produit",
ADD COLUMN     "id_produit" UUID NOT NULL,
ADD CONSTRAINT "Favori_pkey" PRIMARY KEY ("id_favori");

-- AlterTable
ALTER TABLE "LigneCommande" DROP CONSTRAINT "LigneCommande_pkey",
DROP COLUMN "id_ligne",
ADD COLUMN     "id_ligne" UUID NOT NULL,
ALTER COLUMN "prix_unitaire" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "sous_total" SET DATA TYPE DECIMAL(10,2),
DROP COLUMN "id_commande",
ADD COLUMN     "id_commande" UUID NOT NULL,
DROP COLUMN "id_produit",
ADD COLUMN     "id_produit" UUID NOT NULL,
ADD CONSTRAINT "LigneCommande_pkey" PRIMARY KEY ("id_ligne");

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
DROP COLUMN "id_message",
ADD COLUMN     "id_message" UUID NOT NULL,
ALTER COLUMN "date_envoi" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id_utilisateur",
ADD COLUMN     "id_utilisateur" UUID,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("id_message");

-- AlterTable
ALTER TABLE "NewsletterAbonne" DROP CONSTRAINT "NewsletterAbonne_pkey",
DROP COLUMN "id_abonne",
ADD COLUMN     "id_abonne" UUID NOT NULL,
ALTER COLUMN "date_inscription" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "NewsletterAbonne_pkey" PRIMARY KEY ("id_abonne");

-- AlterTable
ALTER TABLE "Page" DROP CONSTRAINT "Page_pkey",
DROP COLUMN "id_page",
ADD COLUMN     "id_page" UUID NOT NULL,
DROP COLUMN "id_utilisateur_admin",
ADD COLUMN     "id_utilisateur_admin" UUID NOT NULL,
ADD CONSTRAINT "Page_pkey" PRIMARY KEY ("id_page");

-- AlterTable
ALTER TABLE "Paiement" DROP CONSTRAINT "Paiement_pkey",
DROP COLUMN "id_paiement",
ADD COLUMN     "id_paiement" UUID NOT NULL,
ALTER COLUMN "montant" SET DATA TYPE DECIMAL(10,2),
DROP COLUMN "id_commande",
ADD COLUMN     "id_commande" UUID NOT NULL,
ADD CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id_paiement");

-- AlterTable
ALTER TABLE "PasserellePaiement" DROP CONSTRAINT "PasserellePaiement_pkey",
DROP COLUMN "urlWebhook",
ADD COLUMN     "url_webhook" TEXT NOT NULL,
DROP COLUMN "id_passerelle",
ADD COLUMN     "id_passerelle" UUID NOT NULL,
ADD CONSTRAINT "PasserellePaiement_pkey" PRIMARY KEY ("id_passerelle");

-- AlterTable
ALTER TABLE "Producteur" DROP CONSTRAINT "Producteur_pkey",
DROP COLUMN "id_producteur",
ADD COLUMN     "id_producteur" UUID NOT NULL,
DROP COLUMN "id_utilisateur",
ADD COLUMN     "id_utilisateur" UUID NOT NULL,
ADD CONSTRAINT "Producteur_pkey" PRIMARY KEY ("id_producteur");

-- AlterTable
ALTER TABLE "Produit" DROP CONSTRAINT "Produit_pkey",
DROP COLUMN "id_produit",
ADD COLUMN     "id_produit" UUID NOT NULL,
ALTER COLUMN "prix_unitaire" SET DATA TYPE DECIMAL(10,2),
DROP COLUMN "id_producteur",
ADD COLUMN     "id_producteur" UUID NOT NULL,
ADD CONSTRAINT "Produit_pkey" PRIMARY KEY ("id_produit");

-- AlterTable
ALTER TABLE "TraiterPar" DROP CONSTRAINT "TraiterPar_pkey",
DROP COLUMN "id_paiement",
ADD COLUMN     "id_paiement" UUID NOT NULL,
DROP COLUMN "id_passerelle",
ADD COLUMN     "id_passerelle" UUID NOT NULL,
ADD CONSTRAINT "TraiterPar_pkey" PRIMARY KEY ("id_paiement", "id_passerelle");

-- AlterTable
ALTER TABLE "Utilisateur" DROP CONSTRAINT "Utilisateur_pkey",
DROP COLUMN "id_utilisateur",
ADD COLUMN     "id_utilisateur" UUID NOT NULL,
ADD CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id_utilisateur");

-- CreateIndex
CREATE UNIQUE INDEX "Favori_id_utilisateur_id_produit_key" ON "Favori"("id_utilisateur", "id_produit");

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_adresse_fkey" FOREIGN KEY ("id_adresse") REFERENCES "Adresse"("id_adresse") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_utilisateur_admin_fkey" FOREIGN KEY ("id_utilisateur_admin") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_utilisateur_client_connectee_fkey" FOREIGN KEY ("id_utilisateur_client_connectee") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_id_utilisateur_admin_fkey" FOREIGN KEY ("id_utilisateur_admin") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_id_utilisateur_admin_fkey" FOREIGN KEY ("id_utilisateur_admin") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_id_utilisateur_client_connectee_fkey" FOREIGN KEY ("id_utilisateur_client_connectee") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_id_utilisateur_admin_fkey" FOREIGN KEY ("id_utilisateur_admin") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_id_ligne_fkey" FOREIGN KEY ("id_ligne") REFERENCES "LigneCommande"("id_ligne") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneCommande" ADD CONSTRAINT "LigneCommande_id_commande_fkey" FOREIGN KEY ("id_commande") REFERENCES "Commande"("id_commande") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneCommande" ADD CONSTRAINT "LigneCommande_id_produit_fkey" FOREIGN KEY ("id_produit") REFERENCES "Produit"("id_produit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_id_producteur_fkey" FOREIGN KEY ("id_producteur") REFERENCES "Producteur"("id_producteur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favori" ADD CONSTRAINT "Favori_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favori" ADD CONSTRAINT "Favori_id_produit_fkey" FOREIGN KEY ("id_produit") REFERENCES "Produit"("id_produit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producteur" ADD CONSTRAINT "Producteur_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_id_commande_fkey" FOREIGN KEY ("id_commande") REFERENCES "Commande"("id_commande") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraiterPar" ADD CONSTRAINT "TraiterPar_id_paiement_fkey" FOREIGN KEY ("id_paiement") REFERENCES "Paiement"("id_paiement") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraiterPar" ADD CONSTRAINT "TraiterPar_id_passerelle_fkey" FOREIGN KEY ("id_passerelle") REFERENCES "PasserellePaiement"("id_passerelle") ON DELETE RESTRICT ON UPDATE CASCADE;
