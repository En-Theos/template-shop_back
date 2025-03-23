import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPublicUser } from 'src/modules/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: FastifyRequest): string | null => {
					return req?.cookies?.access_token ?? null;
				}
			]),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow('JWT_ACCESS_SECRET_KEY')
		});
	}

	async validate(payload: IPublicUser) {
		return payload;
	}
}
