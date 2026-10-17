import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
constructor (private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean{
        const rolesRequis = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if(!rolesRequis){
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        return rolesRequis.includes(user?.role)
    }
}

//Enfin, nous créons une RolesGuardclasse qui comparera les rôles attribués à l'utilisateur actuel aux rôles requis par la route en cours 
// de traitement. Pour accéder aux rôles de la route (métadonnées personnalisées ),
//  nous utiliserons la Reflectorclasse d'assistance fournie par défaut par le framework et accessible depuis le @nestjs/corepackage.