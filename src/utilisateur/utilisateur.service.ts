import { Injectable, InternalServerErrorException, NotFoundException, Logger, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { PrismaService } from '../prisma/prisma.service';
import {  Prisma,Role } from '@prisma/client';
import {Utilisateur} from '../utilisateur/entities/utilisateur.entity'
import * as bcrypt from 'bcryptjs' 

//Le Salt est une chaîne de caractères aléatoires ajoutée au mot de passe avant le hachage. Cela garantit que deux utilisateurs
//  ayant le même mot de passe (ex: 123456) auront deux hashs totalement différents en base de données, bloquant ainsi 
// les attaques par "tables arc-en-ciel" (Rainbow Tables).
const SALT_ROUNDS= 10
//import du type utilisateur sans le mot de passe pour securité
type UtilisateurPublic = Omit<Utilisateur, 'motDePasse'>
// Avant dec ommencer nous devon mettre toutes les fonction en asynchrone
// on va ensuite injecter dans le constructor notre service prisma por 
// pouvoir lutiiliser et interagire avec notre base de donné 
//ensuite nous allons lister ce PrismaService dans les providers dutilisateur module
@Injectable()
export class UtilisateurService {
  private readonly logger = new Logger(UtilisateurService.name)
  constructor(private readonly prisma: PrismaService ){}
  // le promise sert a dire le type de cet element qui sera crere sera definis par le type recu de Utilisateur recu depuis prisa/client 
 async create(createUtilisateurDto: CreateUtilisateurDto): Promise<UtilisateurPublic> {
  //toujour utiliser un trycath pour capter les erreurs 
    try {
      //on va retourner le resultat de la creation dun utilisateur. on va utiliser le service prisma calquer sur le type de utilisateur et utiliser la fonction create qui va prendre en paramete data: createUtilisateurDto 
      //  car notre dto recupere le type de notre utilisateurhashed le mots de passe que on stock dans la variable hashedPassword
      //on utilise la fonction hash fourni ar bcrypt et on 
      const hashedPassword = await bcrypt.hash(createUtilisateurDto.motDePasse, SALT_ROUNDS)
      return await this.prisma.utilisateur.create({
        omit: { motDePasse: true },
        data: {
          nom: createUtilisateurDto.nom,
          prenom: createUtilisateurDto.prenom,
          mail:createUtilisateurDto.mail,
          telephone: createUtilisateurDto.telephone,
          motDePasse: hashedPassword,
          role: Role.CLIENT_CONNECTE  

        }
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
 async findAll(role?:string): Promise<UtilisateurPublic[]> {
  
    try {
      // on va utiliser la methose findMany pour recupere tout les enregistrement de la table erreur
      // on va utliser un if sur lexitance ou nom du parametre role. si un role est fournis on filtrer selon le role sinon on return tous les utilisateur sans clause where
      
      if (role){
        //verifier si la valeur du role fournis est inclue dans notre enum dr nos Role
        const roleUpper = role.toUpperCase()
        
        if(!Object.values(Role).includes(roleUpper as Role)){
          throw new BadRequestException(`Le rôle '${role}' est invalide `)
        }
        return await this.prisma.utilisateur.findMany({
          omit: { motDePasse: true },
          where: {role: roleUpper as Role}
        })
      }
      return await this.prisma.utilisateur.findMany({
        omit: { motDePasse: true }
      });
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      this.logger.error(error)
      throw new InternalServerErrorException('Erreur lors de la récupération de la liste des Utilisateurs')
    }
  }
// ici on attend en promise Utilisateur
 async findOne(idUtilisateur: string): Promise<UtilisateurPublic | null> {
    try {
      const utilisateur = await this.prisma.utilisateur.findUnique({
        omit: { motDePasse: true },
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

   async findByMail(mail: string){ // le type est deuis automatiquement par ts

    try {
      return await this.prisma.utilisateur.findUnique({
        where: {mail},
        select: {
          idUtilisateur: true,
          mail: true,
          role: true,
          motDePasse: true,
      }
    })
      
    } catch (error) {
        
        this.logger.error(error)
        throw new InternalServerErrorException(`Erreur lors de la récupération du mail: ${mail}`)
    }
  }
  
 async update(idUtilisateur: string, updateUtilisateurDto: UpdateUtilisateurDto):Promise<UtilisateurPublic> {
   try {
    //si le mot de passe est modifier il faut le rehasher
    //et on etablie un if() pour que si le mot de passe est declarer on le recupere et on le hash
    let hashedPassword: string | undefined
    if(updateUtilisateurDto.motDePasse){
      hashedPassword = await bcrypt.hash(updateUtilisateurDto.motDePasse, SALT_ROUNDS) 
    }
    return await this.prisma.utilisateur.update({
      omit: { motDePasse: true },
      where: {idUtilisateur},
      data: {...updateUtilisateurDto,
         motDePasse: hashedPassword ,
          } 
          // on utilise le spread operator pour recupe les anciennes donnes et on effect le hashedPassword ou undefined si il est pas obliger de le modifier
          
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
 async remove(idUtilisateur: string): Promise<{message: string}> {
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


 async verifyPassword(plainPassword: string, hashedPassword: string):Promise<boolean>{
  try {
    return await bcrypt.compare(plainPassword, hashedPassword )
    
  } catch (error) {
    this.logger.error(error)
    throw new InternalServerErrorException('Erreur technique lors de la vérifivation de compatibilté des mots de passe')
    
  }

 }
}