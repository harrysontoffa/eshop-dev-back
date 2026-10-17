import { Injectable,InternalServerErrorException, NotFoundException, Logger, ConflictException   } from '@nestjs/common';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Adresse, Prisma, } from '@prisma/client';
@Injectable()
export class AdresseService {
  private readonly logger = new Logger(AdresseService.name)
  constructor(private  prisma: PrismaService){}

  async create(createAdresseDto: CreateAdresseDto, idUtilisateur: string): Promise<Adresse> {
    try {
      return await this.prisma.adresse.create({
        data: {rue: createAdresseDto.rue,
          pays: createAdresseDto.pays,
          ville: createAdresseDto.ville,
          codePostal: createAdresseDto.codePostal,
          idUtilisateur: idUtilisateur
        }
      })
      
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Erreur lors de la creation de l\'adresse')
    }
  }

  async findAll(idUtilisateur: string): Promise<Adresse[]> {
    try {
      return await this.prisma.adresse.findMany({
        where: {idUtilisateur}
      })
    } catch (error) {
       this.logger.error(error)
      throw new InternalServerErrorException('Erreur lors de la récupération de la liste des adresse')
    }
  }

  async  findOne(idAdresse: string, idUtilisateur: string): Promise<Adresse> {
    try {
      const adresse = await this.prisma.adresse.findUnique({
        where: {idAdresse, idUtilisateur}
      })
      if(!adresse){
        throw new NotFoundException(`l\'adresse avec l\'identifiant ${idAdresse} n\'existe pas`)
      }
      return adresse
      
    } catch (error) {
      if(error instanceof NotFoundException) throw error
      this.logger.error(error)
      throw new InternalServerErrorException(`Erreur lors de la recuperaction de L'adresse avec  l\'identifiant ${idAdresse}`)
    }
  }

   async update(idAdresse: string, updateAdresseDto: UpdateAdresseDto, idUtilisateur: string): Promise<Adresse> {
    try {
      return await this.prisma.adresse.update({
        where: {idAdresse, idUtilisateur},
        data: updateAdresseDto
      })
      
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'){
        throw new NotFoundException(`L'adresse avec l'identifiant ${idAdresse} n'existe pas`)
      }
      this.logger.error(error)
      throw new InternalServerErrorException(`Erreur lors de la mise a jour  de L'adresse avec  l\'identifiant ${idAdresse}`)
    }
  }

   async remove(idAdresse: string, idUtilisateur: string) {
    try {
      await this.prisma.adresse.delete({
        where: {idAdresse, idUtilisateur}
      })
      return {message:`Adresse avec l\'identifiant ${idAdresse} supprimé avec succès `}
      
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'){
        throw new NotFoundException(`L'adresse avec l'identifiant ${idAdresse} n'existe pas`)
      }
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003'){
        throw new ConflictException(`L'adresse avec l'identifiant ${idAdresse}   est encore utilisée par une commande`)
      }
      this.logger.error(error)
        throw new InternalServerErrorException(`Erreur lors de la suppression de L'adresse avec  l\'identifiant ${idAdresse}`)

    }
  }
}
