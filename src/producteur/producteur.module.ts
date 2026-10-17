import { Module } from '@nestjs/common';
import { ProducteurService } from './producteur.service';
import { ProducteurController } from './producteur.controller';

@Module({
  controllers: [ProducteurController],
  providers: [ProducteurService],
  exports: [ProducteurService]
})
export class ProducteurModule {}
