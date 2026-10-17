import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe,Req, UseGuards } from '@nestjs/common';
import { AdresseService } from './adresse.service';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';
import type { RequeteAuthentifiee } from '../auth/interfaces/requete-authentifiee.interface';
import { AuthGuard } from '../auth/auth.guard';
 
@Controller('adresse')
export class AdresseController {
  constructor(private readonly adresseService: AdresseService) {}
  @UseGuards(AuthGuard)
  
  @Post()
   async create(@Body() createAdresseDto: CreateAdresseDto,  @Req() req: RequeteAuthentifiee) {
     return await  this.adresseService.create(createAdresseDto, req.user.sub);
  }
  @UseGuards(AuthGuard)
  
  @Get()
   async findAll( @Req() req: RequeteAuthentifiee) {
     return await this.adresseService.findAll(req.user.sub);
  }
  @UseGuards(AuthGuard)
  
  @Get(':id')
   async findOne(@Param('id', ParseUUIDPipe) id: string, @Req() req: RequeteAuthentifiee) {
     return await this.adresseService.findOne(id, req.user.sub);
  }
  @UseGuards(AuthGuard)
  
  @Patch(':id')
   async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAdresseDto: UpdateAdresseDto, @Req() req: RequeteAuthentifiee) {
     return await this.adresseService.update(id, updateAdresseDto, req.user.sub);
  }
  @UseGuards(AuthGuard)
  
  @Delete(':id')
   async remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: RequeteAuthentifiee) {
     return await this.adresseService.remove(id, req.user.sub);
  }
}
