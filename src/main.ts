import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// Active la validation des DTO (class-validator) sur toutes les routes.
// Sans ce pipe, les décorateurs @IsEmail, @Matches, etc. ne sont jamais exécutés.sans aucune vérification. Tout ce qu'on a construit dans les DTO ne sert à rien tant que ce n'est pas ajouté.
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // supprime les champs non déclarés dans le DTO
    forbidNonWhitelisted: true,  // rejette la requête si un champ inconnu est envoyé
    transform: true  // convertit automatiquement les types (ex: string → number)
  }))
  app.enableCors({origin:'http://localhost:3000'})
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
