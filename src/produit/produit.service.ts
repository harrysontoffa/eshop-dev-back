import { Injectable, Logger, InternalServerErrorException, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Produit } from '@prisma/client';

@Injectable()
export class ProduitService {

  private readonly logger = new Logger(ProduitService.name)
  constructor(private readonly prisma: PrismaService){}

  async create(createProduitDto: CreateProduitDto, idUtilisateur: string): Promise<Produit> {
    try {
      return await this.prisma.produit.create({
        data: {nom: createProduitDto.nom,
               description: createProduitDto.description,
               prixUnitaire: createProduitDto.prixUnitaire,
               stock: createProduitDto.stock,
               photoUrl: createProduitDto.photoUrl,
               producteur: {connect: {idUtilisateur}} // rattache le produit au producteur de l'utilisateur connecte (idUtilisateur est @unique sur Producteur)
        }
      })

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
         {throw new NotFoundException('Aucun producteur n\'est associé à votre compte')}
            this.logger.error(error)

            throw new InternalServerErrorException('Erreur lors de la creation du produit')
    }

  }

  async findAll():Promise<Produit[]> {
    try {
      return await this.prisma.produit.findMany();

    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Erreur lors de la récupération de la liste des produits')

    }
  }

  async findOne(idProduit: string): Promise<Produit> {
     try {
         const produit = await this.prisma.produit.findUnique({
           where: {idProduit}
         })
         if(!produit){
            throw new NotFoundException(`Le produit avec l'identifiant ${idProduit} n'existe pas`)
         }
         return  produit

     } catch (error) {
      if (error instanceof NotFoundException) throw error
      this.logger.error(error)
      throw new InternalServerErrorException(`Erreur lors de la récupération du produit avec l'identifiant ${idProduit}`)

     }
  }

  async update(idProduit: string, updateProduitDto: UpdateProduitDto, idUtilisateur: string):Promise<Produit> {
     try {
      return await this.prisma.produit.update({
        where: {idProduit, producteur: {idUtilisateur}}, // le produit doit appartenir au producteur de l'utilisateur connecte
        data: updateProduitDto
      })

     } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'){
        throw new NotFoundException (`Le produit avec l'identifiant ${idProduit} n'existe pas`)
      }
      this.logger.error(error)
      throw new InternalServerErrorException(`Erreur lors de la mise à jour du produit avec l'identifiant ${idProduit}`)

     }
  }

  async remove(idProduit: string, idUtilisateur: string):Promise<{message: string}> {
     try {
        await this.prisma.produit.delete({
        where: {idProduit, producteur: {idUtilisateur}}
      })
        return {message: `produit avec l'identifiant ${idProduit} supprimé avec succès`}

     } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
              throw new NotFoundException(`Le produit avec l'identifiant ${idProduit} n'existe pas`)
            }
       if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003')
         {throw new ConflictException('Ce produit ne peut pas être supprimé : il est rattaché à des lignes de commande ou des favoris')}

            this.logger.error(error)
            throw new InternalServerErrorException(`Erreur lors de la suppression du produit avec l'identifiant ${idProduit}`)

     }

  }
}
