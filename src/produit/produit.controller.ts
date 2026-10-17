import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import type { RequeteAuthentifiee } from '../auth/interfaces/requete-authentifiee.interface';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createProduitDto: CreateProduitDto, @Req() req: RequeteAuthentifiee) {
    return await this.produitService.create(createProduitDto, req.user.sub);
  }

  @Get()
  async findAll() {
    return await this.produitService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.produitService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProduitDto: UpdateProduitDto, @Req() req: RequeteAuthentifiee) {
    return await this.produitService.update(id, updateProduitDto, req.user.sub);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: RequeteAuthentifiee) {
    return await this.produitService.remove(id, req.user.sub);
  }
}
