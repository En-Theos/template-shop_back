import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, In, Repository } from 'typeorm'

import { AddProductMyShoppingCartDto } from '../dtos/shopping-cart/AddProductMyShoppingCart.dto'
import { DeleteProductMyShoppingCartDto } from '../dtos/shopping-cart/DeleteProductMyShoppingCart.dto'
import { ITokenUser } from '../entities/user.entity'
import { ShoppingCart } from '../schemes/shopping-cart.scheme'

import { UserService } from './user.service'

@Injectable()
export class ShoppingCartService {
	constructor(
		@InjectRepository(ShoppingCart)
		private readonly shoppingCartRepository: Repository<ShoppingCart>,

		private readonly userService: UserService,

		private readonly dataSource: DataSource
	) {}

	async getMyShoppingCart(user: ITokenUser) {
		const userDB = await this.userService.checkExsistUser(user.id, {
			shoppingCart: {
				product: true
			}
		})

		return userDB.shoppingCart
	}

	async addProductMyShoppingCart(dto: { userId: ITokenUser['id'] } & AddProductMyShoppingCartDto) {
		await this.userService.checkExsistUser(dto.userId)

		const existingItem = await this.shoppingCartRepository.findOne({
			where: {
				user: { id: dto.userId },
				product: { id: dto.productId }
			}
		})

		if (existingItem) {
			existingItem.quantity = dto.quantity
			await this.shoppingCartRepository.save(existingItem)
		} else {
			const newItem = this.shoppingCartRepository.create({
				user: { id: dto.userId },
				product: { id: dto.productId },
				quantity: dto.quantity
			})
			await this.shoppingCartRepository.save(newItem)
		}
	}

	async deleteProductMyShoppingCart(dto: { userId: ITokenUser['id'] } & DeleteProductMyShoppingCartDto) {
		await this.userService.checkExsistUser(dto.userId)

		await this.shoppingCartRepository.delete({
			user: { id: dto.userId },
			product: { id: In(dto.productIds) }
		})
	}
}
