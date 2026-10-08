import { Injectable, InternalServerErrorException,NotFoundException, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Message, Prisma  } from '@prisma/client';


@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name)
  constructor(private prisma: PrismaService){}

  async create(createMessageDto: CreateMessageDto):Promise<Message> {
    try {
      return await this.prisma.message.create({
        data: {
          ...createMessageDto,
          dateEnvoi: new Date()
        }
      })
      
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Erreur lors de la creation du message')
      
    }
  }

  async findAll():Promise<Message[]> {
    try {
      return await this.prisma.message.findMany();
      
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Erreur lors de la récupération de la liste des messages')
      
    }
   
  }

  async findOne(idMessage: string):Promise<Message> {

    try {
       const message =  await this.prisma.message.findUnique({
        where: {idMessage}
       })
       if(!message){
        throw new NotFoundException(`Le message avec l'identifiant ${idMessage} n'existe pas`)
       }
       return message
      
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      this.logger.error(error)
      throw new InternalServerErrorException(`Erreur lors de la récupération du message avec l'identifiant ${idMessage}`)

      
    }
  }

  async update(idMessage: string, updateMessageDto: UpdateMessageDto):Promise<Message> {
    try {
      return await this.prisma.message.update({
        where: {idMessage},
        data: updateMessageDto
      })
      
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Le message avec l'identifiant ${idMessage} n'existe pas`)
      }
      this.logger.error(error)
      throw new InternalServerErrorException(`Erreur lors de la mise à jour du message avec l\'identifiant ${idMessage}`)
      
    }
  }

  async remove(idMessage: string):Promise<{message: string}> {
    try {
      await this.prisma.message.delete({
        where: {idMessage}
      })
      return {message: `message avec l\'identifiant ${idMessage} supprimé avec succès`}
      
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Le message avec l'identifiant ${idMessage} n'existe pas`)
      }
      this.logger.error(error)
      throw new InternalServerErrorException(`Erreur lors de la suppression du message avec l'identifiant ${idMessage}`)
      
    }
  }
}
