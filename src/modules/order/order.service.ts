import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { IdParamDto } from 'src/dtos/IdParam.dto'
import { ERoleNames } from 'src/interfaces/ERoleNames'
import { EntityManager, Repository } from 'typeorm'

import { ITokenUser } from '../user/entities/user.entity'
import { UserService } from '../user/services/user.service'

import { CreateOrderDto } from './dtos/CreateOrder.dto'
import { GetAllOrdersDto } from './dtos/GetAllOrders.dto'
import { UpdateOrderInfoDto } from './dtos/UpdateOrderInfo.dto'
import { Order } from './schemes/order.scheme'

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(Order)
		private readonly ordersRepository: Repository<Order>,

		@InjectEntityManager()
		private readonly entityManager: EntityManager,

		private readonly userService: UserService
	) {}

	async getAllOrders(query: { user: ITokenUser } & GetAllOrdersDto) {
		const queryDB = this.ordersRepository.createQueryBuilder('order')

		if (query.dateFrom) {
			queryDB.andWhere('order.createdAt >= :dateFrom', { dateFrom: query.dateFrom })
		}

		if (query.dateTo) {
			queryDB.andWhere('order.createdAt <= :dateTo', { dateTo: query.dateTo })
		}

		if (query.orderStatus) {
			queryDB.andWhere('order.orderStatus = :orderStatus', { orderStatus: query.orderStatus })
		}

		if (query.deliveryStatus) {
			queryDB.andWhere('order.deliveryStatus = :deliveryStatus', { deliveryStatus: query.deliveryStatus })
		}

		if (query.paymentStatus) {
			queryDB.andWhere('order.paymentStatus = :paymentStatus', { paymentStatus: query.paymentStatus })
		}

		if (query.user.role !== ERoleNames.ADMIN && query.user) {
			queryDB.andWhere('order.user.id = :userId', { userId: query.user.id })
		}

		const page = query?.page ?? 1
		const limit = query?.limit ?? 10
		queryDB
			.addSelect(['order.createdAt', 'order.updatedAt'])
			.skip((page - 1) * limit)
			.take(limit)

		const [items, total] = await queryDB.getManyAndCount()

		return {
			items,
			total,
			totalPages: Math.ceil(total / limit)
		}
	}

	async getOneProduct(param: { user: ITokenUser } & IdParamDto) {
		const queryDB = this.ordersRepository
			.createQueryBuilder('order')
			.leftJoinAndSelect('order.products', 'product')
			.where('order.id = :id', { id: param.id })
			.addSelect(['order.createdAt', 'order.updatedAt'])

		if (param.user.role !== ERoleNames.ADMIN) {
			queryDB.andWhere('order.user.id = :userId', { userId: param.user.id })
		} else {
			queryDB
				.leftJoin('order.user', 'user')
				.addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.middleName', 'user.email', 'user.phone'])
		}

		const existingOrder = await queryDB.getOne()

		if (!existingOrder) {
			if (param.user.role === ERoleNames.ADMIN) {
				throw new NotFoundException('Замовлення не знайдено')
			}
			throw new ForbiddenException('У вас немає доступу до цього замовлення')
		}

		return existingOrder
	}

	async updateOrderInfo(dto: IdParamDto & UpdateOrderInfoDto) {
		const existingOrder = await this.ordersRepository.findOne({
			where: { id: dto.id }
		})
		if (!existingOrder) throw new NotFoundException('Замовлення не знайдено')

		await this.ordersRepository.save({ ...existingOrder, ...dto })
	}

	async createOrder(dto: CreateOrderDto) {
		const existingUser = await this.userService.getAndCheckUser([{ email: dto.email }, { phone: dto.phone }])

		return await this.entityManager.transaction(async manager => {
			// 1. Спершу створюємо сам об'єкт замовлення
			const order = manager.create(Order, {
				...dto,
				user: existingUser // Привʼязка до користувача
			})

			const savedOrder = await manager.save(Order, order)

			// 2. Тепер прив'язуємо товари до замовлення
			if (dto.productIds.length > 0) {
				const values = dto.productIds.map(productId => `(${savedOrder.id}, ${productId})`).join(', ')

				await manager.query(`
				INSERT INTO product_orders (ordersId, productsId)
				VALUES ${values}
			  `)
			}

			// 3. Повертаємо збережене замовлення
			return savedOrder
		})
	}
}
