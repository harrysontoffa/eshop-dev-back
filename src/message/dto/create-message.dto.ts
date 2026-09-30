import { IsString, IsNotEmpty, MaxLength, IsEmail, IsOptional, IsInt } from 'class-validator'

export class CreateMessageDto {
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom est requis' })
  @MaxLength(50, { message: 'Le nom doit contenir au plus 50 caractères' })
  nom: string

  @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le prénom est requis' })
  @MaxLength(50, { message: 'Le prénom doit contenir au plus 50 caractères' })
  prenom: string

  @IsEmail({}, { message: "L'email est invalide" })
  email: string

  @IsString({ message: 'Le sujet doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le sujet est requis' })
  @MaxLength(150, { message: 'Le sujet doit contenir au plus 150 caractères' })
  sujet: string

  @IsString({ message: 'Le contenu doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le contenu est requis' })
  @MaxLength(5000, { message: 'Le contenu doit contenir au plus 5000 caractères' })
  contenu: string

  @IsOptional()
  @IsInt({ message: "L'identifiant utilisateur doit être un nombre entier" })
  idUtilisateur?: number
}