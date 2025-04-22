import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { Authorization } from 'src/decorators/auth.decorator'
import { ERoleNames } from 'src/interfaces/ERoleNames'

import { AddProductMyRevisedDto } from '../dtos/revised/AddProductMyRevised.dto'
import { ITokenUser } from '../entities/user.entity'
import { RevisedService } from '../services/revised.service'

@Controller('revised')
export class RevisedController {
	constructor(private readonly revisedService: RevisedService) {}

	@Authorization(ERoleNames.USER)
	@Get('/')
	async getMyRevised(@Req() request: FastifyRequest) {
		const userFromToken = request.user as ITokenUser

		return await this.revisedService.getMyRevised(userFromToken)
	}

	@Authorization(ERoleNames.USER)
	@Post('/')
	async addProductMyRevised(@Req() request: FastifyRequest, @Body() dto: AddProductMyRevisedDto) {
		const userFromToken = request.user as ITokenUser

		return await this.revisedService.addProductMyRevised({ userId: userFromToken.id, ...dto })
	}
}
