import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// INFO: used for second level authentication(authorization, kind of) with JWT

function queryOrHeaderExtractor(req) {
    if (req?.query?.token) {
        return req.query.token;
    }

    const authHeader = req?.headers?.authorization;
    if (!authHeader) return null;

    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    return match ? match[1] : null;
}

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: queryOrHeaderExtractor,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || configService.get<string>('JWT_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: any) {
        console.log('Validating JWT payload:', payload);

        return payload;
    }
}
