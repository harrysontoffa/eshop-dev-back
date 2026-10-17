import { Transform } from "class-transformer"
import { IsNotEmpty, MinLength, MaxLength, IsString, IsNumber, IsPositive, Max, IsInt, Min } from "class-validator"

export class CreateProduitDto {

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,)
  @IsString()
  @IsNotEmpty({message:'Le nom est requis'})
  @MinLength(3,{message:'Le nom doit contenir au moin 3 caractères'})
  @MaxLength(100,{message:'Le nom doit contenir au plus 100 caractères'})
  nom: string

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,)
  @IsString()
  @IsNotEmpty({message:'La description est requise'})
  @MinLength(3,{message:'La description doit contenir au moin 3 caractères'})
  @MaxLength(255,{message:'La description doit contenir au plus 255 caractères'})
  description: string

  @IsNumber({maxDecimalPlaces: 2},{message:'Le prix unitaire doit être un nombre avec au plus 2 décimales'})
  @IsPositive({message:'Le prix unitaire doit être supérieur à 0'})
  @Max(99999999.99,{message:'Le prix unitaire doit être inférieur ou égal à 99999999.99'}) // limite du Decimal(10, 2) du schéma : 8 chiffres avant la virgule, 2 après
  prixUnitaire: number

  @IsInt({message:'Le stock doit être un nombre entier'})
  @Min(0,{message:'Le stock ne peut pas être négatif'})
  stock: number

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,)
  @IsString()
  @IsNotEmpty({message:'La photo est requise'})
  @MaxLength(255,{message:'L\'url de la photo doit contenir au plus 255 caractères'})
  photoUrl: string

}
// ici on retire idProduit car la base le genere elle meme grace au @default(uuid())
// et idProducteur car il est retrouve cote serveur a partir du token, jamais envoye par le client
