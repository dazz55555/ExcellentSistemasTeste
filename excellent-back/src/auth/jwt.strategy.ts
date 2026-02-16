import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GetUserByEmailService } from 'src/users/services/get-user-by-email.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly getUserByEmailService: GetUserByEmailService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'chave_secreta12345678909f3b8a7c4e6d1f2a9b3c8d7e6f5a4b3c',
        });
    }

    async validate(payload: any) {
        const user = await this.getUserByEmailService.run(payload.email);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
