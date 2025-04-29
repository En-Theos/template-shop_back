import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AddProductMyRevisedDto } from '../dtos/revised/AddProductMyRevised.dto'
import { ITokenUser } from '../entities/user.entity'
import { Revised } from '../schemes/revised.scheme'

import { UserService } from './user.service'

@Injectable()
export class RevisedService {
	constructor(
		@InjectRepository(Revised)
		private readonly revisedRepository: Repository<Revised>,

		private readonly userService: UserService
	) {}

	async getMyRevised(user: ITokenUser) {
		const userDB = await this.userService.getAndCheckUser(
			{ id: user.id },
			{
				revised: {
					product: true
				}
			}
		)

		return userDB.revised
	}

	async addProductMyRevised(dto: { userId: ITokenUser['id'] } & AddProductMyRevisedDto) {
		let products = await this.revisedRepository.find({
			where: {
				user: { id: dto.userId }
			},
			relations: {
				product: true
			}
		})

		if (!products.some(item => item.product.id === dto.productId)) {
			const newItem = this.revisedRepository.create({
				user: { id: dto.userId },
				product: { id: dto.productId }
			})

			products.push(newItem)

			if (products.length > 10) {
				await this.revisedRepository.delete({ id: products[0].id })
			}

			await this.revisedRepository.save(newItem)
		}
	}
}
