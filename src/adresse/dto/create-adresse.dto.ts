import { IsString, IsNotEmpty, MaxLength, Matches,IsOptional, IsInt } from "class-validator"
export class CreateAdresseDto {
@IsString({message:'La rue doit être une chaîne de caractères'})
@IsNotEmpty({message:'La rue est requise'})
@MaxLength(255, { message: 'La rue doit contenir au plus 255 caractères' })  rue: string

 @Matches(/^\d{5}$/, { message: 'Le code postal doit contenir 5 chiffres' })
  codePostal: string 
  @IsString({message:'La ville doit être une chaine de caractère'})
  @IsNotEmpty({message:'La ville est requise '})
  @MaxLength(100, {message:'La ville doit contenir au plus 100 caractère'})
  ville: string

  @IsString({ message: 'Le pays doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le pays est requis' })
  @MaxLength(100, { message: 'Le pays doit contenir au plus 100 caractères' })
  pays: string

  @IsOptional()
  @IsInt({ message: "L'identifiant utilisateur doit être un nombre entier" })
  idUtilisateur?: number 
}
 