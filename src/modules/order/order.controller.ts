import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { Authorization } from 'src/decorators/auth.decorator'
import { IdParamDto } from 'src/dtos/IdParam.dto'
import { ERoleNames } from 'src/interfaces/ERoleNames'

import { ITokenUser } from '../user/entities/user.entity'

import { CreateOrderDto } from './dtos/CreateOrder.dto'
import { GetAllOrdersDto } from './dtos/GetAllOrders.dto'
import { UpdateOrderInfoDto } from './dtos/UpdateOrderInfo.dto'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Authorization(ERoleNames.USER, ERoleNames.ADMIN)
	@Get('/')
	async getAllOrders(@Req() request: FastifyRequest, @Query() query: GetAllOrdersDto) {
		const userFromToken = request.user as ITokenUser
		return await this.orderService.getAllOrders({ user: userFromToken, ...query })
	}

	@Authorization(ERoleNames.USER, ERoleNames.ADMIN)
	@Get('/:id')
	async getOneOrder(@Req() request: FastifyRequest, @Param() param: IdParamDto) {
		const userFromToken = request.user as ITokenUser

		return await this.orderService.getOneProduct({ user: userFromToken, ...param })
	}

	@Authorization(ERoleNames.ADMIN)
	@Patch('/:id')
	async updateOrderInfo(@Param() param: IdParamDto, @Body() dto: UpdateOrderInfoDto) {
		return await this.orderService.updateOrderInfo({ id: param.id, ...dto })
	}

	@Post('/')
	async createOrder(@Body() dto: CreateOrderDto) {
		return await this.orderService.createOrder(dto)
	}
}
