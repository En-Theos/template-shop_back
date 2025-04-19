import { Body, Controller, Delete, Get, Post, Query, Req } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { Authorization } from 'src/decorators/auth.decorator'
import { ERoleNames } from 'src/interfaces/ERoleNames'

import { AddProductMyShoppingCartDto } from '../dtos/shopping-cart/AddProductMyShoppingCart.dto'
import { DeleteProductMyShoppingCartDto } from '../dtos/shopping-cart/DeleteProductMyShoppingCart.dto'
import { ITokenUser } from '../entities/user.entity'
import { ShoppingCartService } from '../services/shopping-cart.service'

@Controller('shopping-cart')
export class ShoppingCartController {
	constructor(private readonly shoppingCartService: ShoppingCartService) {}

	@Authorization(ERoleNames.USER)
	@Get('/')
	async getMyShoppingCart(@Req() request: FastifyRequest) {
		const userFromToken = request.user as ITokenUser

		return await this.shoppingCartService.getMyShoppingCart(userFromToken)
	}

	@Authorization(ERoleNames.USER)
	@Post('/')
	async addProductMyShoppingCart(@Req() request: FastifyRequest, @Body() dto: AddProductMyShoppingCartDto) {
		const userFromToken = request.user as ITokenUser

		return await this.shoppingCartService.addProductMyShoppingCart({ userId: userFromToken.id, ...dto })
	}

	@Authorization(ERoleNames.USER)
	@Delete('/')
	async deleteProductMyShoppingCart(@Req() request: FastifyRequest, @Query() query: DeleteProductMyShoppingCartDto) {
		const userFromToken = request.user as ITokenUser

		return await this.shoppingCartService.deleteProductMyShoppingCart({ userId: userFromToken.id, ...query })
	}
}
