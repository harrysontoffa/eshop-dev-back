import { Injectable,InternalServerErrorException, NotFoundException, Logger   } from '@nestjs/common';
import { CreateAdresseDto } from './dto/create-adresse.dto';
import { UpdateAdresseDto } from './dto/update-adresse.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Adresse, Prisma, } from '@prisma/client';
@Injectable()
export class AdresseService {
  private readonly logger = new Logger(AdresseService.name)
  constructor(private  prisma: PrismaService){}

  async create(createAdresseDto: CreateAdresseDto): Promise<Adresse> {
    try {
      return await this.prisma.adresse.create({
        data: createAdresseDto
      })
      
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Erreur lors de la creation de l\'adresse')
    }
  }

  async findAll(): Promise<Adresse[]> {
    try {
      return await this.prisma.adresse.findMany()
    } catch (error) {
       this.logger.error(error)
      throw new InternalServerErrorException('Erreur lors de la récupération de la liste des adresse')
    }
  }

  async  findOne(idAdresse: string): Promise<Adresse> {
    try {
      const adresse = await this.prisma.adresse.findUnique({
        where: {idAdresse}
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

   async update(idAdresse: string, updateAdresseDto: UpdateAdresseDto): Promise<Adresse> {
    try {
      return await this.prisma.adresse.update({
        where: {idAdresse},
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

   async remove(idAdresse: string) {
    try {
      await this.prisma.adresse.delete({
        where: {idAdresse}
      })
      return {message:`Adresse avec l\'identifiant ${idAdresse} supprimé avec succès `}
      
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'){
        throw new NotFoundException(`L'adresse avec l'identifiant ${idAdresse} n'existe pas`)
      }
      this.logger.error(error)
        throw new InternalServerErrorException(`Erreur lors de la suppression de L'adresse avec  l\'identifiant ${idAdresse}`)

    }
  }
}
