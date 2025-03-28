import { Body, Controller, Get, Put, Req } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { Authorization } from 'src/decorators/auth.decorator'
import { ERoleNames } from 'src/interfaces/ERoleNames'

import { UpdateUserInfoDto } from './dtos/UpdateUserInfo.dto'
import { IPublicUser, ITokenUser } from './entities/user.entity'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Authorization(ERoleNames.USER, ERoleNames.ADMIN)
	@Get('/one')
	async userInfo(@Req() request: FastifyRequest): Promise<IPublicUser> {
		const userFromToken = request.user as ITokenUser

		return await this.userService.getUserInfo(userFromToken.id)
	}

	@Authorization(ERoleNames.USER)
	@Put('/')
	async updateUserInfo(@Body() dto: UpdateUserInfoDto, @Req() request: FastifyRequest): Promise<IPublicUser> {
		const userFromToken = request.user as ITokenUser

		const newUser = this.userService.updateUserInfo({
			userId: userFromToken.id,
			newData: dto
		})

		return newUser
	}

	@Authorization(ERoleNames.ADMIN)
	@Get('/all')
	async allUsersInfo() {
		return await this.userService.getAllUsersInfo();
	}
}
