import { Transform } from "class-transformer"
import { IsNotEmpty, MinLength, MaxLength,  IsString  } from "class-validator"
 
export class CreateProducteurDto {

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
  @MinLength(3,{message:'La description doit contenir  au moin 3 caractères'})
  @MaxLength(255,{message:'La description doit contenir au plus 255 caractères'})
  description:  string

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,)
  @IsString()
  @IsNotEmpty({message:'La specialite est requise'})
  @MinLength(3,{message:'La specialite doit contenir  au moin 3 caractères'})
  @MaxLength(50,{message:'La specialite doit contenir au plus 50 caractères'})
  specialite:   string

   



}
