import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductService } from 'src/modules/product/product.service'
import { Repository } from 'typeorm'

import { AddProductMyFavoritesDto } from '../dtos/favorite/AddProductMyFavorites.dto'
import { DeleteProductMyFavoritesDto } from '../dtos/favorite/DeleteProductMyFavorites.dto'
import { ITokenUser } from '../entities/user.entity'
import { User } from '../schemes/user.scheme'

import { UserService } from './user.service'

@Injectable()
export class FavoriteService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,

		private readonly userService: UserService,

		private readonly productService: ProductService
	) {}

	async getMyFavorites(user: ITokenUser) {
		const userDB = await this.userService.getAndCheckUser(
			{ id: user.id },
			{
				favorites: true
			}
		)

		return userDB.favorites
	}

	async addProductMyFavorites(dto: { userId: ITokenUser['id'] } & AddProductMyFavoritesDto) {
		const userDB = await this.userService.getAndCheckUser(
			{ id: dto.userId },
			{
				favorites: true
			}
		)

		const existingProduct = await this.productService.checkExsistProduct(dto.productId)

		userDB.favorites.push(existingProduct)

		this.userRepository.save(userDB)
	}

	async deleteProductMyFavorites(dto: { userId: ITokenUser['id'] } & DeleteProductMyFavoritesDto) {
		const userDB = await this.userService.getAndCheckUser(
			{ id: dto.userId },
			{
				favorites: true
			}
		)

		userDB.favorites = userDB.favorites.filter(item => !dto.productIds.includes(item.id))

		this.userRepository.save(userDB)
	}
}
