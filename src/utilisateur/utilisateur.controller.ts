import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { LoginUtilisateurDto } from './dto/LoginUtilisateur.dto';
import { Observable } from 'rxjs';

// voicis notre controllers qui on ete genere lors de la creation du modul utilisateur grace a la commande nest generate resource Utilisateur
// ces controller sont nos routes . on a une route pour chaque action du crud pour crer modifier supprimer et lister
// on va rendre aussi ici toutes nos fonctions asynchrone
@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Post()
  async create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
    return await this.utilisateurService.create(createUtilisateurDto);
  }
  


  @Get()
  async findAll() {
    return await this.utilisateurService.findAll();
  }

  @Get(':id')
   async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.utilisateurService.findOne(id);
  }

  @Patch(':id')
   async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUtilisateurDto: UpdateUtilisateurDto) {
    return await this.utilisateurService.update(id, updateUtilisateurDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.utilisateurService.remove(id);
  }
}
