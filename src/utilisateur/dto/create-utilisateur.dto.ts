import { IsNotEmpty, MinLength, MaxLength, IsEmail, Matches  } from "class-validator"
export class CreateUtilisateurDto {
 
  
  
  @IsNotEmpty({message:'Le nom est requis'})
  @MinLength(3,{message:'Le nom doit contenir au moin 3 caractères'})
  @MaxLength(20,{message:'Le nom doit contenir au plus 20 caractères'})
  nom: string 
  
  @IsNotEmpty({message:'Le prenom est requis'})
  @MinLength(3,{message:'Le prenom doit contenir au moin 3 caractères'})
  @MaxLength(20,{message:'Le prenom doit contenir au plus 20 caractères'})
  prenom: string
  
  @IsEmail({},{message:'le mail est invalide'})
  @IsNotEmpty({message:'le mail est requis'})
  mail: string
  
  @IsNotEmpty({ message: 'Le téléphone est requis' })
  @Matches(/^(0[1-9]\d{8}|\+33[1-9]\d{8})$/, {message: 'Le téléphone doit être au format 0XXXXXXXXX ou +33XXXXXXXXX'}) //regex pour la condition sur le numero de telephone pour prendre en charge les deux formats 
  telephone: string
  
  @IsNotEmpty({message:'Le mot de passe est requis'})
  @MinLength(12, { message: 'Le mot de passe doit contenir au moins 12 caractères' })
  @MaxLength(72, { message: 'Le mot de passe doit contenir au plus 72 caractères' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])(?!.*\s)(?!.*(.)\1\1).{12,72}$/,
    {message: 'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial, sans espace ni 3 caractères identiques à la suite'}
  )
  motDePasse:  string 

  
}
// ici on retire role date et idUtilisateur, car la base met la date et l'idUtilisateur elle meme grace au @default(now()) et @default(autoincrement())
// ln role se choisit cote serveur jamais par celui qui sinscrit