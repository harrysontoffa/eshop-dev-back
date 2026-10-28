import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator  } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import type { RequeteAuthentifiee } from '../auth/interfaces/requete-authentifiee.interface';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { MulterExceptionFilter } from './multer-exception.filter';
import { UseFilters } from '@nestjs/common';

@UseFilters(MulterExceptionFilter)
@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
   @UseInterceptors(FileInterceptor('image', {          // 'image' = même nom que le append du front
    storage: diskStorage({
      destination: './uploads/produits',
      filename: (req, file, cb) => cb(null, `${randomUUID()}${extname(file.originalname)}`),
    }),
  }))
  async create(@Body() createProduitDto: CreateProduitDto, 
   @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),   // 2 Mo, comme le front
        new FileTypeValidator({ fileType: /(jpeg|png|webp)$/, fallbackToMimetype: true }),
      ],
    })) image: Express.Multer.File,
    @Req() req: RequeteAuthentifiee) {
      const photoUrl = `/uploads/produits/${image.filename}` 
    return await this.produitService.create(createProduitDto,photoUrl, req.user.sub);
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
