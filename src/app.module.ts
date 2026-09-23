import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UtilisateurModule } from './utilisateur/utilisateur.module';

// on importe dans le app module le configOmdule pour que il soit accessible dans toute les fichiers .Il sert à charger les variabl
// es définies dans un fichier .env et à les rendre accessibles dans 
// toute l'application via l'injection de dépendances, plutôt que d'utiliser directement process.env partout dans le code.
// la commande nest generate resource Utilisateur a creer notre module utilisateur et la i,jecter dans le app modul
@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), UtilisateurModule],  // forroot va enregistrer le service. on va lui donner la propiete isglobal true pour rendre le ConfigModul accessible a tous les autres modules
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
