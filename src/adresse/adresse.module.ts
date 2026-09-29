import { Module } from '@nestjs/common';
import { AdresseService } from './adresse.service';
import { AdresseController } from './adresse.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AdresseController],
  providers: [AdresseService, PrismaService],
})
export class AdresseModule {}
