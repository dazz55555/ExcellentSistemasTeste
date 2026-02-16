import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {

        if (info?.message === 'No auth token') {
            throw new UnauthorizedException('Authorization header não encontrado');
        }

        if (err || !user) {
            throw err || new UnauthorizedException('Token inválido ou expirado');
        }

        return user;
    }
}
