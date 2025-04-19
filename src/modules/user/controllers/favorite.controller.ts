import { Body, Controller, Delete, Get, Post, Query, Req } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { Authorization } from 'src/decorators/auth.decorator'
import { ERoleNames } from 'src/interfaces/ERoleNames'

import { AddProductMyFavoritesDto } from '../dtos/favorite/AddProductMyFavorites.dto'
import { DeleteProductMyFavoritesDto } from '../dtos/favorite/DeleteProductMyFavorites.dto'
import { ITokenUser } from '../entities/user.entity'
import { FavoriteService } from '../services/favorite.service'

@Controller('favorite')
export class FavoriteController {
	constructor(private readonly favoriteService: FavoriteService) {}

	@Authorization(ERoleNames.USER)
	@Get('/')
	async getMyFavorites(@Req() request: FastifyRequest) {
		const userFromToken = request.user as ITokenUser

		return await this.favoriteService.getMyFavorites(userFromToken)
	}

	@Authorization(ERoleNames.USER)
	@Post('/')
	async addProductMyFavorites(@Req() request: FastifyRequest, @Body() dto: AddProductMyFavoritesDto) {
		const userFromToken = request.user as ITokenUser

		return await this.favoriteService.addProductMyFavorites({ userId: userFromToken.id, ...dto })
	}

	@Authorization(ERoleNames.USER)
	@Delete('/')
	async deleteProductMyFavorites(@Req() request: FastifyRequest, @Query() query: DeleteProductMyFavoritesDto) {
		const userFromToken = request.user as ITokenUser

		return await this.favoriteService.deleteProductMyFavorites({ userId: userFromToken.id, ...query })
	}
}
