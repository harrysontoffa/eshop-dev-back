-- CreateTable
CREATE TABLE "Utilisateur" (
    "id_utilisateur" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "Adresse" (
    "id_adresse" SERIAL NOT NULL,
    "rue" TEXT NOT NULL,
    "code_postal" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "pays" TEXT NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,

    CONSTRAINT "Adresse_pkey" PRIMARY KEY ("id_adresse")
);

-- CreateTable
CREATE TABLE "Message" (
    "id_message" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sujet" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "date_envoi" TIMESTAMP(3) NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id_message")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id_commande" SERIAL NOT NULL,
    "date_commande" TIMESTAMP(3) NOT NULL,
    "statut" TEXT NOT NULL,
    "montantTotal" DECIMAL(65,30) NOT NULL,
    "id_adresse" INTEGER NOT NULL,
    "id_utilisateur_admin" INTEGER NOT NULL,
    "id_utilisateur_client_connectee" INTEGER NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id_commande")
);

-- CreateTable
CREATE TABLE "Page" (
    "id_page" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "type_page" TEXT NOT NULL,
    "id_utilisateur_admin" INTEGER NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id_page")
);

-- CreateTable
CREATE TABLE "Article" (
    "id_article" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "date_publication" TIMESTAMP(3) NOT NULL,
    "id_utilisateur_admin" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id_article")
);

-- CreateTable
CREATE TABLE "Avis" (
    "id_avis" SERIAL NOT NULL,
    "note" INTEGER NOT NULL,
    "commentaire" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "date_avis" TIMESTAMP(3) NOT NULL,
    "id_utilisateur_client_connectee" INTEGER NOT NULL,
    "id_utilisateur_admin" INTEGER NOT NULL,
    "id_ligne" INTEGER NOT NULL,

    CONSTRAINT "Avis_pkey" PRIMARY KEY ("id_avis")
);

-- CreateTable
CREATE TABLE "LigneCommande" (
    "id_ligne" SERIAL NOT NULL,
    "quantite" INTEGER NOT NULL,
    "prix_unitaire" DECIMAL(65,30) NOT NULL,
    "sous_total" DECIMAL(65,30) NOT NULL,
    "id_commande" INTEGER NOT NULL,
    "id_produit" INTEGER NOT NULL,

    CONSTRAINT "LigneCommande_pkey" PRIMARY KEY ("id_ligne")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id_produit" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix_unitaire" DECIMAL(65,30) NOT NULL,
    "stock" INTEGER NOT NULL,
    "photo_url" TEXT NOT NULL,
    "id_producteur" INTEGER NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id_produit")
);

-- CreateTable
CREATE TABLE "Favori" (
    "id_favori" SERIAL NOT NULL,
    "date_ajout" TIMESTAMP(3) NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,
    "id_produit" INTEGER NOT NULL,

    CONSTRAINT "Favori_pkey" PRIMARY KEY ("id_favori")
);

-- CreateTable
CREATE TABLE "Producteur" (
    "id_producteur" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "specialite" TEXT NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,

    CONSTRAINT "Producteur_pkey" PRIMARY KEY ("id_producteur")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id_paiement" SERIAL NOT NULL,
    "montant" DECIMAL(65,30) NOT NULL,
    "date_paiement" TIMESTAMP(3) NOT NULL,
    "statut" TEXT NOT NULL,
    "methode" TEXT NOT NULL,
    "id_commande" INTEGER NOT NULL,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id_paiement")
);

-- CreateTable
CREATE TABLE "PasserellePaiement" (
    "id_passerelle" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "urlWebhook" TEXT NOT NULL,

    CONSTRAINT "PasserellePaiement_pkey" PRIMARY KEY ("id_passerelle")
);

-- CreateTable
CREATE TABLE "TraiterPar" (
    "id_paiement" INTEGER NOT NULL,
    "id_passerelle" INTEGER NOT NULL,

    CONSTRAINT "TraiterPar_pkey" PRIMARY KEY ("id_paiement","id_passerelle")
);

-- CreateTable
CREATE TABLE "newsLetterAbonne" (
    "id_abonne" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "date_inscription" TIMESTAMP(3) NOT NULL,
    "consentement" BOOLEAN NOT NULL,

    CONSTRAINT "newsLetterAbonne_pkey" PRIMARY KEY ("id_abonne")
);

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_adresse_fkey" FOREIGN KEY ("id_adresse") REFERENCES "Adresse"("id_adresse") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_utilisateur_admin_fkey" FOREIGN KEY ("id_utilisateur_admin") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_id_utilisateur_client_connectee_fkey" FOREIGN KEY ("id_utilisateur_client_connectee") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_id_utilisateur_admin_fkey" FOREIGN KEY ("id_utilisateur_admin") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_id_utilisateur_admin_fkey" FOREIGN KEY ("id_utilisateur_admin") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_id_utilisateur_client_connectee_fkey" FOREIGN KEY ("id_utilisateur_client_connectee") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_id_utilisateur_admin_fkey" FOREIGN KEY ("id_utilisateur_admin") REFERENCES "Utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

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
