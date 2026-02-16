import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolesEnum } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        );

        if (!requiredRoles) {
            return true; // rota não exige roles
        }

        const { user } = context.switchToHttp().getRequest();

        // libera o acesso de admin em todas as rotas
        if (user.role === RolesEnum.ADMIN) {
            return true;
        }

        // retorna false caso o usuário nao tenha a role necessária
        return requiredRoles.includes(user.role);
    }
}
