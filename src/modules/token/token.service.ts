import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from "uuid"
import { ITokenUser } from '../user/entities/user.entity';
import { Token } from '../user/schemes/token.scheme';

@Injectable()
export class TokenService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    generateRefreshToken(payload: ITokenUser): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET_KEY"),
            expiresIn: '30d'
        })
    }

    generateAccessToken(payload: ITokenUser): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow<string>("JWT_ACCESS_SECRET_KEY"),
            expiresIn: '30m'
        })
    }

    async validateRefreshToken(refresh_token: string): Promise<ITokenUser> {
        try {
            const payload = await this.jwtService.verifyAsync(
                refresh_token,
                {
                    secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET_KEY")
                }
            );

            return payload;
        } catch {
            throw new UnauthorizedException();
        }
    }

    generateForgotPasswordToken(): {
        token: string;
        expiresIn: Date;
    } {
        const token = uuid();
        const expiresIn = new Date(new Date().getTime() + 300000)

        return {token, expiresIn}
    }

    validateForgotPasswordToken(token: Token): boolean {
        return new Date(token.expiresIn).getTime() > (new Date()).getTime();
    }
}