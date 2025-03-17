import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ITokenUser } from 'src/interfaces/IUser';

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

}