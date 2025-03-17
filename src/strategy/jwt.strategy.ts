import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from "express";
import { IPublicUser } from 'src/interfaces/IUser';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    if (req && req.cookies) {
                        return req.cookies["access_token"];
                    }
                    return null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow("JWT_ACCESS_SECRET_KEY")
        });
    }

    async validate(payload: IPublicUser) {
        return payload;
    }
}