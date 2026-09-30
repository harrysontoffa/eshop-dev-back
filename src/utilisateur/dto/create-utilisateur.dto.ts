export class CreateUtilisateurDto {
 
  nom: string 
  prenom: string
  mail: string
  telephone: string
  motDePasse:  string 
  
}
// ici on retire role date et idUtilisateur, car la base met la date et l'idUtilisateur elle meme grace au @default(now()) et @default(autoincrement())
// ln role se choisit cote serveur jamais par celui qui sinscrit