import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// ici si mon bootstrap ne contient pas app.useGlobalPipes(new ValidationPipe()). Sans ça, tous les décorateurs 
// class-validator de tes DTO (@IsNotEmpty, @IsEmail, @Matches, @IsEnum, etc.) sont ignorés à l'exécution. NestJS ne
//  les active que si un ValidationPipe est branché — sinon les requêtes passent telles quelles jusqu'au service, 
// sans aucune vérification. Tout ce qu'on a construit dans les DTO ne sert à rien tant que ce n'est pas ajouté.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // supprime les champs non déclarés dans le DTO
    forbidNonWhitelisted: true,  // rejette la requête si un champ inconnu est envoyé
    transform: true  // convertit automatiquement les types (ex: string → number)
  }))
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
