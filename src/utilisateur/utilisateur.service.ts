import { Injectable, InternalServerErrorException, NotFoundException, Logger, ConflictException } from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Utilisateur, Prisma } from '@prisma/client';

// Avant dec ommencer nous devon mettre toutes les fonction en asynchrone
// on va ensuite injecter dans le constructor notre service prisma por 
// pouvoir lutiiliser et interagire avec notre base de donné 
//ensuite nous allons lister ce PrismaService dans les providers dutilisateur module
@Injectable()
export class UtilisateurService {
  private readonly logger = new Logger(UtilisateurService.name)
  constructor(private prisma: PrismaService){}
  // le promise sert a dire le type de cet element qui sera crere sera definis par le type recu de Utilisateur recu depuis prisa/client 
 async create(createUtilisateurDto: CreateUtilisateurDto): Promise<Utilisateur> {
  //toujour utiliser un trycath pour capter les erreurs 
    try {
      //on va retourner le resultat de la creation dun utilisateur. on va utiliser le service prisma calquer sur le type de utilisateur et utiliser la fonction create qui va prendre en paramete data: createUtilisateurDto 
            //  car notre dto recupere le type de notre utilisateur
      return await this.prisma.utilisateur.create({
        data: createUtilisateurDto
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
              throw new ConflictException('Cet email est déjà utilisé')
      }
      this.logger.error(error)
      //envoyer une erreur 500 lorsque on as un probleme
      throw new InternalServerErrorException('Erreur lors de la creation de l\'utilisateur')
    }
  }
// pour le fin all vu que on attends une list on va promise une liste en type 
 async findAll(): Promise<Utilisateur[]> {
    try {
      // on va utiliser la methose findMany pour recupere tout les enregistrement de la table erreur
      return await this.prisma.utilisateur.findMany();
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Erreur lors de la récupération de la liste des Utilisateurs')
    }
  }
// ici on attend en promise Utilisateur
 async findOne(idUtilisateur: number): Promise<Utilisateur> {
    try {
      const utilisateur = await this.prisma.utilisateur.findUnique({
        where: {idUtilisateur}
      })
      if(!utilisateur){
        throw new   NotFoundException(`l\'utilisateur avec l\'identifiant ${idUtilisateur} n\'existe pas`)
      }
      return utilisateur
    } catch (error) {
        if (error instanceof NotFoundException) throw error
        this.logger.error(error)
        throw new InternalServerErrorException(`Erreur lors de la récupération de l'utilisateur avec l'identifiant ${idUtilisateur}`)
    }
  }

 async update(idUtilisateur: number, updateUtilisateurDto: UpdateUtilisateurDto):Promise<Utilisateur> {
   try {
    return await this.prisma.utilisateur.update({
      where: {idUtilisateur},
      data: updateUtilisateurDto
    })
   } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
  throw new ConflictException('Cet email est déjà utilisé')
}
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
    throw new NotFoundException(`L'utilisateur avec l'identifiant ${idUtilisateur} n'existe pas`)
  }
  this.logger.error(error)
  throw new InternalServerErrorException(`Erreur lors de la mise à jour de l'utilisateur avec l'identifiant ${idUtilisateur}`)
}
  }
// ici on va juste promise unmessage a afficher si tout se passe bien lors de la suppression
 async remove(idUtilisateur: number): Promise<{message: string}> {
  try {
    await this.prisma.utilisateur.delete({
      where: {idUtilisateur}
    })// si tout se passe bien on retourne le messafe suivant 
    return {message: `Utilisateur avec l\'identifiant ${idUtilisateur} supprimé avec succès`} 
  } catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
    throw new NotFoundException(`L'utilisateur avec l'identifiant ${idUtilisateur} n'existe pas`)
  }
  this.logger.error(error)
  throw new InternalServerErrorException(`Erreur lors de la suppression de l'utilisateur avec l'identifiant ${idUtilisateur}`)
}
    
  }
}
