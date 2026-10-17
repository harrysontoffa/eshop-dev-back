import { Role} from "@prisma/client";
import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
//Maintenant que nous disposons d'un @Roles()décorateur personnalisé, nous pouvons l'utiliser pour décorer n'importe quel gestionnaire de route.