import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Message, Prisma } from '@prisma/client';
import { error } from 'console';
import e from 'express';
@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name)
  constructor(private prisma: PrismaService){}

  async create(createMessageDto: CreateMessageDto):Promise<Message> {
    try {
      return await this.prisma.message.create({
        data: createMessageDto
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
      throw new InternalServerErrorException('')
      
    }
   
  }

  async findOne(idMessage: number):Promise<Message> {

    try {
       const message =  await this.prisma.message.findUnique({
        where: {idMessage}
       })
       if(!message){
        throw new InternalServerErrorException(`Erreur lors de la récupération du message avec l'identifiant ${idMessage}`)
       }
       return message
      
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(`Erreur lors de la récupération du message avec l'identifiant ${idMessage}`)

      
    }
  }

  async update(idMessage: number, updateMessageDto: UpdateMessageDto):Promise<Message> {
    try {
      return await this.prisma.message.update({
        where: {idMessage},
        data: updateMessageDto
      })
      
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Erreur lors de la creation du message')
      
    }
  }

  async remove(idMessage: number):Promise<{message: string}> {
    try {
      await this.prisma.message.delete({
        where: {idMessage}
      })
      return {message: `message avec l\'identifiant ${idMessage} supprimé avec succès`}
      
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(`Erreur lors de la suppression de l'utilisateur avec l'identifiant ${idMessage}`)
      
    }
  }
}
