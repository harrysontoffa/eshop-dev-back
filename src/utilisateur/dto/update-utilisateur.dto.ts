import { PartialType } from '@nestjs/mapped-types';
import { CreateUtilisateurDto } from './create-utilisateur.dto';

export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {}
// le updatedto utilise une fonction PartialType fourni par le ^paquet '@nestjs/mapped-types' 
//  que on va utiliser pour affecter a UpdateUtilisateurDto les meme parametre de CreateUtilisateurDto et les rend optionnels