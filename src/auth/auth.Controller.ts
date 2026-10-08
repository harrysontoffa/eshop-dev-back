import {Body , Controller , HttpCode, Post} from '@nestjs/common'
import { LoginUtilisateurDto } from '../utilisateur/dto/LoginUtilisateur.dto'
import { AuthService } from './services/auth.service'
 
@Controller('auth')
export class AuthController{
    constructor (private readonly authService: AuthService){}
 @Post('connexion')
  @HttpCode(200)
   async connexion(@Body() loginUtilisateurDto: LoginUtilisateurDto){
    return await  this.authService.login(loginUtilisateurDto)
    
 }

}

