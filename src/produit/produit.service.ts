import {
  Injectable,
  Logger,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Produit } from '@prisma/client';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ProduitService {
  private readonly logger = new Logger(ProduitService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createProduitDto: CreateProduitDto,
    photoUrl: string,
    idUtilisateur: string,
  ): Promise<Produit> {
    try {
      return await this.prisma.produit.create({
        data: {
          nom: createProduitDto.nom,
          description: createProduitDto.description,
          prixUnitaire: createProduitDto.prixUnitaire,
          stock: createProduitDto.stock,
          photoUrl: photoUrl,
          producteur: { connect: { idUtilisateur } }, // rattache le produit au producteur de l'utilisateur connecte (idUtilisateur est @unique sur Producteur)
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          "Aucun producteur n'est associé à votre compte",
        );
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Vous avez déjà un produit avec ce nom');
      }
      this.logger.error(error);

      throw new InternalServerErrorException(
        'Erreur lors de la creation du produit',
      );
    }
  }

  async findAll(): Promise<Produit[]> {
    try {
      return await this.prisma.produit.findMany({
        include: { producteur: { select: { nom: true, specialite: true } } },
      }); // a chaque requette find renvoie le nom et la specialité du producteur include:{producteur:{select:{nom:true,specialite:true}}}
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Erreur lors de la récupération de la liste des produits',
      );
    }
  }

  async findOne(idProduit: string): Promise<Produit> {
    try {
      const produit = await this.prisma.produit.findUnique({
        where: { idProduit },
        include: { producteur: { select: { nom: true, specialite: true } } },
      });
      if (!produit) {
        throw new NotFoundException(
          `Le produit avec l'identifiant ${idProduit} n'existe pas`,
        );
      }
      return produit;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(error);
      throw new InternalServerErrorException(
        `Erreur lors de la récupération du produit avec l'identifiant ${idProduit}`,
      );
    }
  }

  async update(
    idProduit: string,
    updateProduitDto: UpdateProduitDto,
    idUtilisateur: string,
  ): Promise<Produit> {
    try {
      return await this.prisma.produit.update({
        where: { idProduit, producteur: { idUtilisateur } }, // le produit doit appartenir au producteur de l'utilisateur connecte
        data: updateProduitDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Le produit avec l'identifiant ${idProduit} n'existe pas`,
        );
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Vous avez déjà un produit avec ce nom');
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        `Erreur lors de la mise à jour du produit avec l'identifiant ${idProduit}`,
      );
    }
  }

  async remove(
    idProduit: string,
    idUtilisateur: string,
  ): Promise<{ message: string }> {
    try {
      // 1. Lire le produit (et vérifier qu'il appartient au producteur connecté)
      const produit = await this.prisma.produit.findFirst({
        where: { idProduit, producteur: { idUtilisateur } },
      });
      if (!produit) {
        throw new NotFoundException(
          `Le produit avec l'identifiant ${idProduit} n'existe pas`,
        );
      }

      //2 suppression de la ligne en base
      await this.prisma.produit.delete({
        where: { idProduit, producteur: { idUtilisateur } },
      });
      // 3. Supprimer l'image ; si elle a déjà disparu, on ignore l'erreur
      await unlink(join(process.cwd(), produit.photoUrl)).catch(() => {});
      return {
        message: `produit avec l'identifiant ${idProduit} supprimé avec succès`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new ConflictException(
          'Ce produit ne peut pas être supprimé : il est rattaché à des lignes de commande ou des favoris',
        );
      }

      this.logger.error(error);
      throw new InternalServerErrorException(
        `Erreur lors de la suppression du produit avec l'identifiant ${idProduit}`,
      );
    }
  }
}
