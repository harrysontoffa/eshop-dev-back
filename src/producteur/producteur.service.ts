import { Injectable, Logger, InternalServerErrorException, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateProducteurDto } from './dto/create-producteur.dto';
import { UpdateProducteurDto } from './dto/update-producteur.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Producteur } from '@prisma/client';
 
@Injectable()
export class ProducteurService {

  private readonly logger = new Logger(ProducteurService.name)
  constructor(private readonly prisma: PrismaService){}
  
  async create(createProducteurDto: CreateProducteurDto, idUtilisateur: string): Promise<Producteur> {
    try {
      return await this.prisma.producteur.create({
        data: {nom: createProducteurDto.nom,
               description: createProducteurDto.description,
               specialite: createProducteurDto.specialite,
               idUtilisateur: idUtilisateur
               
        }
      })
      
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
         {throw new ConflictException('idUtilisateur  correspond  déja à  producteur existant')}

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003')
         {throw new ConflictException('idUtilisateur ne correspond à aucun utilisateur existant')}
            this.logger.error(error)
            
            throw new InternalServerErrorException('Erreur lors de la creation du producteur')
    }
    
  }

  async findAll():Promise<Producteur[]> {
    try {
      return await this.prisma.producteur.findMany();

    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Erreur lors de la récupération de la liste des Producteurs')
      
    }
  }

  async findOne(idProducteur: string): Promise<Producteur> {
     try {
         const producteur = await this.prisma.producteur.findUnique({
           where: {idProducteur}
         })
         if(!producteur){
            throw new NotFoundException(`Le Producteur avec l'identifiant ${idProducteur} n'existe pas`)
         }
         return  producteur
  
     } catch (error) {
      if (error instanceof NotFoundException) throw error
      this.logger.error(error)
      throw new InternalServerErrorException(`Erreur lors de la récupération du producteur avec l'identifiant ${idProducteur}`)

      
     }
  }

  async update(idProducteur: string, updateProducteurDto: UpdateProducteurDto, idUtilisateur: string):Promise<Producteur> {
     try {
      return await this.prisma.producteur.update({
        where: {idProducteur, idUtilisateur },
        data: updateProducteurDto
      })

      
     } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'){
        throw new NotFoundException (`Le producteur avec l'identifiant ${idProducteur} n'existe pas`)
      }
      this.logger.error(error)
      throw new InternalServerErrorException(`Erreur lors de la mise à jour du producteur avec l'\'identifiant ${idProducteur}`)
      
     }
  }

  async remove(idProducteur: string, idUtilisateur: string):Promise<{message: string}> {
     try {
        await this.prisma.producteur.delete({
        where: {idProducteur, idUtilisateur}
      })
        return {message: `producteur avec l\'identifiant ${idProducteur} supprimé avec succès`}

     } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
              throw new NotFoundException(`Le producteur avec l'identifiant ${idProducteur} n'existe pas`)
            }
       if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003')
         {throw new ConflictException('Ce producteur ne peut pas être supprimé : des produits lui sont encore rattachés')}
             
            this.logger.error(error)
            throw new InternalServerErrorException(`Erreur lors de la suppression du producteur avec l'identifiant ${idProducteur}`)
      
     }

  }
}
