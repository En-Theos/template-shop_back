import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JwtStrategy } from '../../strategy/jwt.strategy'
import { TokenModule } from '../token/token.module'
import { User } from '../user/schemes/user.scheme'
import { UserModule } from '../user/user.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [UserModule, TokenModule, PassportModule],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
