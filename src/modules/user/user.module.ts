import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Token } from './schemes/token.scheme'
import { User } from './schemes/user.scheme'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([User, Token])],
	controllers: [UserController],
	providers: [UserService],
	exports: [TypeOrmModule]
})
export class UserModule {}
