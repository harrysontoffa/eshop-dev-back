import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UtilisateurController],
  providers: [UtilisateurService, PrismaService],
})
export class UtilisateurModule {}
