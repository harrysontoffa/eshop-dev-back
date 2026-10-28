/*
  Warnings:

  - A unique constraint covering the columns `[id_producteur,nom]` on the table `Produit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Produit_id_producteur_nom_key" ON "Produit"("id_producteur", "nom");
