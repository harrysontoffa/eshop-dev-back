import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdresseService } from './adresse.service';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';

@Controller('adresse')
export class AdresseController {
  constructor(private readonly adresseService: AdresseService) {}

  @Post()
   async create(@Body() createAdresseDto: CreateAdresseDto) {
     return await  this.adresseService.create(createAdresseDto);
  }

  @Get()
   async findAll() {
     return await this.adresseService.findAll();
  }

  @Get(':id')
   async findOne(@Param('id') id: string) {
     return await this.adresseService.findOne(+id);
  }

  @Patch(':id')
   async update(@Param('id') id: string, @Body() updateAdresseDto: UpdateAdresseDto) {
     return await this.adresseService.update(+id, updateAdresseDto);
  }

  @Delete(':id')
   async remove(@Param('id') id: string) {
     return await this.adresseService.remove(+id);
  }
}
