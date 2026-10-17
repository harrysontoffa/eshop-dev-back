/*
  Warnings:

  - A unique constraint covering the columns `[id_utilisateur]` on the table `Producteur` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Producteur_id_utilisateur_key" ON "Producteur"("id_utilisateur");
