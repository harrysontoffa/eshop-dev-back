import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  //PrismaModule qui est le module qui gère la connexion a notre base de donnee , on en auras besoin pour communiquer avec notre base de donnee
  imports: [PrismaModule],
  controllers: [UtilisateurController],
  providers: [UtilisateurService, PrismaService],
  exports: [UtilisateurService]
})
export class UtilisateurModule {}
