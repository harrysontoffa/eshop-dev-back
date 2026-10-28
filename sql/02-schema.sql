-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT_CONNECTE');
-- CreateEnum
CREATE TYPE "StatutCommande" AS ENUM ('EN_ATTENTE', 'PAYEE', 'EN_PREPARATION', 'LIVREE', 'ANNULEE', 'ECHOUEE');
-- CreateEnum
CREATE TYPE "StatutPaiement" AS ENUM ('EN_ATTENTE', 'EN_COURS', 'VALIDE', 'REFUSE');
-- CreateTable
CREATE TABLE "Utilisateur" (
    "id_utilisateur" UUID NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT_CONNECTE',
    "mail" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "Adresse" (
    "id_adresse" UUID NOT NULL,
    "rue" TEXT NOT NULL,
    "code_postal" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "pays" TEXT NOT NULL,
    "id_utilisateur" UUID,

    CONSTRAINT "Adresse_pkey" PRIMARY KEY ("id_adresse")
);

-- CreateTable
CREATE TABLE "Message" (
    "id_message" UUID NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sujet" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "date_envoi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_utilisateur" UUID,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id_message")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id_commande" UUID NOT NULL,
    "date_commande" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut" "StatutCommande" NOT NULL DEFAULT 'EN_ATTENTE',
    "montant_total" DECIMAL(10,2) NOT NULL,
    "email_contact" TEXT NOT NULL,
    "nom_contact" TEXT NOT NULL,
    "prenom_contact" TEXT NOT NULL,
    "telephone_contact" TEXT NOT NULL,
    "id_adresse" UUID NOT NULL,
    "id_utilisateur_admin" UUID,
    "id_utilisateur_client_connectee" UUID,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id_commande")
);

-- CreateTable
CREATE TABLE "Page" (
    "id_page" UUID NOT NULL,
    "titre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "type_page" TEXT NOT NULL,
    "id_utilisateur_admin" UUID NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id_page")
);

-- CreateTable
CREATE TABLE "Article" (
    "id_article" UUID NOT NULL,
    "titre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "date_publication" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_utilisateur_admin" UUID NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id_article")
);

-- CreateTable
CREATE TABLE "Avis" (
    "id_avis" UUID NOT NULL,
    "note" INTEGER NOT NULL,
    "commentaire" TEXT,
    "statut" TEXT NOT NULL,
    "date_avis" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_utilisateur_client_connectee" UUID NOT NULL,
    "id_utilisateur_admin" UUID,
    "id_ligne" UUID NOT NULL,

    CONSTRAINT "Avis_pkey" PRIMARY KEY ("id_avis")
);

-- CreateTable
CREATE TABLE "LigneCommande" (
    "id_ligne" UUID NOT NULL,
    "quantite" INTEGER NOT NULL,
    "prix_unitaire" DECIMAL(10,2) NOT NULL,
    "sous_total" DECIMAL(10,2) NOT NULL,
    "id_commande" UUID NOT NULL,
    "id_produit" UUID NOT NULL,

    CONSTRAINT "LigneCommande_pkey" PRIMARY KEY ("id_ligne")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id_produit" UUID NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix_unitaire" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL,
    "photo_url" TEXT NOT NULL,
    "id_producteur" UUID NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id_produit")
);

-- CreateTable
CREATE TABLE "Favori" (
    "id_favori" UUID NOT NULL,
    "date_ajout" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_utilisateur" UUID NOT NULL,
    "id_produit" UUID NOT NULL,

    CONSTRAINT "Favori_pkey" PRIMARY KEY ("id_favori")
);

-- CreateTable
CREATE TABLE "Producteur" (
    "id_producteur" UUID NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "specialite" TEXT NOT NULL,
    "id_utilisateur" UUID NOT NULL,

    CONSTRAINT "Producteur_pkey" PRIMARY KEY ("id_producteur")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id_paiement" UUID NOT NULL,
    "montant" DECIMAL(10,2) NOT NULL,
    "date_paiement" TIMESTAMP(3),
    "methode" TEXT NOT NULL,
    "stripe_session_id" TEXT,
    "statut" "StatutPaiement" NOT NULL DEFAULT 'EN_ATTENTE',
    "id_commande" UUID NOT NULL,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id_paiement")
);

-- CreateTable
CREATE TABLE "PasserellePaiement" (
    "id_passerelle" UUID NOT NULL,
    "nom" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url_webhook" TEXT NOT NULL,

    CONSTRAINT "PasserellePaiement_pkey" PRIMARY KEY ("id_passerelle")
);

-- CreateTable
CREATE TABLE "TraiterPar" (
    "id_paiement" UUID NOT NULL,
    "id_passerelle" UUID NOT NULL,

    CONSTRAINT "TraiterPar_pkey" PRIMARY KEY ("id_paiement","id_passerelle")
);

-- CreateTable
CREATE TABLE "NewsletterAbonne" (
    "id_abonne" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "date_inscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consentement" BOOLEAN NOT NULL,

    CONSTRAINT "NewsletterAbonne_pkey" PRIMARY KEY ("id_abonne")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_mail_key" ON "Utilisateur"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Favori_id_utilisateur_id_produit_key" ON "Favori"("id_utilisateur", "id_produit");

-- CreateIndex
CREATE UNIQUE INDEX "Producteur_id_utilisateur_key" ON "Producteur"("id_utilisateur");

-- CreateIndex
CREATE UNIQUE INDEX "Paiement_stripe_session_id_key" ON "Paiement"("stripe_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterAbonne_email_key" ON "NewsletterAbonne"("email");

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

