import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { LoginUtilisateurDto } from '../../utilisateur/dto/LoginUtilisateur.dto';

@Injectable()
export class AuthService {
  // Hash calculé une seule fois au démarrage, utilisé quand l'adresse est inconnue
  private readonly hashFactice = bcrypt.hashSync('mot-de-passe-factice', 12);

  constructor(
    private readonly utilisateurService: UtilisateurService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginUtilisateurDto): Promise<{ accessToken: string }> {
    const utilisateur = await this.utilisateurService.findByMail(dto.mail); // recupere dans la variable utilisateur le return de findByEmail(dto.mail) qui sont les donnes envoyer par le clien lors de la connexion au site

    // On compare TOUJOURS, même si l'adresse n'existe pas
    const motDePasseValide = await bcrypt.compare(  // on recupere un boolean de la comparaison du mots dz psse envoyer par lutilisateur depuis le formalaire de connexion avec le mots de passe recu grae au findByEmail

      dto.motDePasse,
      utilisateur?.motDePasse ?? this.hashFactice,
    );

    if (!utilisateur || !motDePasseValide) { // si utilisateur nexiste pas ou mots de passe invalide, refuser lacces avec lerreur sion crerr le jwt
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = { sub: utilisateur.idUtilisateur, role: utilisateur.role };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}