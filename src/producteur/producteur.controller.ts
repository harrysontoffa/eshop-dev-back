import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { ProducteurService } from './producteur.service';
import { CreateProducteurDto } from './dto/create-producteur.dto';
import { UpdateProducteurDto } from './dto/update-producteur.dto';
import type { RequeteAuthentifiee } from '../auth/interfaces/requete-authentifiee.interface';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client'; 

@Controller('producteur')
export class ProducteurController {
  constructor(private readonly producteurService: ProducteurService) {}
  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  
  @Post()
  async create(@Body() createProducteurDto: CreateProducteurDto, @Req() req: RequeteAuthentifiee) {
    return await this.producteurService.create(createProducteurDto, req.user.sub);
  }

   

  @Get()
  async findAll() {
    return await this.producteurService.findAll();
  }

   

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.producteurService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProducteurDto: UpdateProducteurDto, @Req() req: RequeteAuthentifiee) {
    return await this.producteurService.update(id, updateProducteurDto, req.user.sub);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string,  @Req() req: RequeteAuthentifiee) {
    return await this.producteurService.remove(id, req.user.sub );
  }
}
