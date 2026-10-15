import {Body , Controller , HttpCode,HttpStatus, Post, Get , Req, UseGuards} from '@nestjs/common'
import { LoginUtilisateurDto } from '../utilisateur/dto/LoginUtilisateur.dto'
import { AuthService } from './services/auth.service'
import { AuthGuard } from './auth.guard'
 import type { Request } from 'express';
 interface RequeteAuthentifiee extends Request {
   user:{
      sub: string;
      role: string;
   };
 }
@Controller('auth')
export class AuthController{
    constructor (private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('connexion')
    
    async connexion(@Body() loginUtilisateurDto: LoginUtilisateurDto){
         return await  this.authService.login(loginUtilisateurDto)
    
 }

 

 @UseGuards(AuthGuard)
 
 @Get('profil')
 getProfil(@Req() req: RequeteAuthentifiee){
   return req.user;
 }

}

