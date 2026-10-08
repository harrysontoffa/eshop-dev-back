import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginUtilisateurDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsNotEmpty({ message: "L'adresse e-mail est obligatoire." })
  @IsEmail({}, { message: "L'adresse e-mail n'est pas valide." })
  mail: string;

  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe est obligatoire.' })
  @MaxLength(72)
  motDePasse: string;
}