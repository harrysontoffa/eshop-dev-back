-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT_CONNECTE');

-- Renommer la colonne "date" en "date_creation" (les dates existantes sont conservées)
ALTER TABLE "Utilisateur" RENAME COLUMN "date" TO "date_creation";
ALTER TABLE "Utilisateur" ALTER COLUMN "date_creation" SET DEFAULT CURRENT_TIMESTAMP;

-- Convertir le rôle texte en enum (les rôles existants sont conservés)
ALTER TABLE "Utilisateur" ALTER COLUMN "role" TYPE "Role"
  USING (CASE WHEN lower("role") = 'admin' THEN 'ADMIN' ELSE 'CLIENT_CONNECTE' END)::"Role";
ALTER TABLE "Utilisateur" ALTER COLUMN "role" SET DEFAULT 'CLIENT_CONNECTE';