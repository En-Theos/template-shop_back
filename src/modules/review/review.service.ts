import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IdParamDto } from 'src/dtos/IdParam.dto'
import { DataSource, In, Repository } from 'typeorm'

import { ProductService } from '../product/product.service'
import { ITokenUser } from '../user/entities/user.entity'

import { CreateReviewDto } from './dtos/CreateReview.dto'
import { DeleteReviewsDto } from './dtos/DeleteReviews.dto'
import { GetReviewsDto } from './dtos/GetReviews.dto'
import { UpdateReviewDto } from './dtos/UpdateReview.dto'
import { Review } from './schemes/review.scheme'

@Injectable()
export class ReviewService {
	constructor(
		@InjectRepository(Review)
		private readonly reviewsRepository: Repository<Review>,

		private readonly dataSource: DataSource,

		private readonly productService: ProductService
	) {}

	async getRecentReviews(query: GetReviewsDto) {
		const page = query.page ?? 1
		const limit = query.limit ?? 10
		const sortRate = (query.sortRate ?? 'desc').toLocaleUpperCase() as 'ASC' | 'DESC'

		const [items, total] = await this.reviewsRepository
			.createQueryBuilder('review')
			.leftJoin('review.product', 'product')
			.addSelect(['product.id', 'product.name'])
			.leftJoin('review.user', 'user')
			.addSelect(['user.id', 'user.firstName'])
			.orderBy('review.rating', sortRate)
			.skip((page - 1) * limit)
			.take(limit)
			.getManyAndCount()

		return {
			items,
			total,
			totalPages: Math.ceil(total / limit)
		}
	}

	async getProductReviews(param: IdParamDto, query: GetReviewsDto) {
		const page = query.page ?? 1
		const limit = query.limit ?? 10
		const sortRate = (query.sortRate ?? 'desc').toLocaleUpperCase() as 'ASC' | 'DESC'

		const queryDB = this.reviewsRepository
			.createQueryBuilder('review')
			.leftJoin('review.user', 'user')
			.addSelect(['user.id', 'user.firstName'])
			.where('review.product = :productId', { productId: param.id })
			.orderBy('review.rating', sortRate)
			.skip((page - 1) * limit)
			.take(limit)

		const [items, total] = await queryDB.getManyAndCount()

		return {
			items,
			total,
			totalPages: Math.ceil(total / limit)
		}
	}

	async createReview(dto: { userId: ITokenUser['id'] } & CreateReviewDto) {
		await this.productService.checkExsistProduct(dto.productId)

		const review = this.reviewsRepository.create({
			...dto,
			user: { id: dto.userId },
			product: { id: dto.productId }
		})

		const createdReview = await this.reviewsRepository.save(review)

		const avgResult = await this.reviewsRepository
			.createQueryBuilder('review')
			.select('AVG(review.rating)', 'avg')
			.where('review.product.id = :productId', { productId: dto.productId })
			.getRawOne()

		try {
			await this.productService.updateRating([{ productId: dto.productId, rating: parseFloat(avgResult.avg) || 0 }])
		} catch (error) {
			this.reviewsRepository.delete({ id: createdReview.id })

			throw new InternalServerErrorException('Непередбачувана помилка')
		}

		return await this.reviewsRepository.findOne({
			where: { id: createdReview.id }
		})
	}

	async updateReview(dto: IdParamDto & UpdateReviewDto) {
		const exsistReview = await this.reviewsRepository.findOne({
			where: { id: dto.id },
			relations: {
				product: true
			}
		})
		if (!exsistReview) throw new NotFoundException('Відгук не знайдено')

		await this.reviewsRepository.update(dto.id, dto)

		const avgResult = await this.reviewsRepository
			.createQueryBuilder('review')
			.select('AVG(review.rating)', 'avg')
			.where('review.product.id = :productId', { productId: exsistReview.product.id })
			.getRawOne()

		try {
			await this.productService.updateRating([{ productId: exsistReview.product.id, rating: parseFloat(avgResult.avg) || 0 }])
		} catch (error) {
			this.reviewsRepository.update(exsistReview.id, exsistReview)

			throw new InternalServerErrorException('Непередбачувана помилка')
		}

		return await this.reviewsRepository.findOne({
			where: { id: dto.id }
		})
	}

	async deleteReviews(query: DeleteReviewsDto) {
		return await this.dataSource.transaction(async manager => {
			// 1. Отримуємо відгуки, що будуть видалені
			const reviewsToDelete = await manager.getRepository(Review).find({
				where: { id: In(query.reviewIds) },
				relations: { product: true }
			})

			if (reviewsToDelete.length === 0) return

			// 2. Збираємо всі унікальні productId
			const productIds = [...new Set(reviewsToDelete.map(review => review.product.id))]

			// 3. Видаляємо відгуки
			await manager.getRepository(Review).delete({ id: In(query.reviewIds) })

			// 4. Отримуємо всі відгуки, що залишились по цих товарах
			const remainingReviews = await manager
				.getRepository(Review)
				.createQueryBuilder('review')
				.select('review.product_id', 'productId')
				.addSelect('AVG(review.rating)', 'avgRating')
				.where('review.product_id IN (:...productIds)', { productIds })
				.groupBy('review.product_id')
				.getRawMany()

			// 5. Готуємо CASE конструкцію для оновлення рейтингу
			const productRatings = productIds.map(productId => {
				const found = remainingReviews.find(r => +r.productId === productId)
				return {
					productId,
					rating: found ? parseFloat(found.avgRating) : 0
				}
			})

			await this.productService.updateRating(productRatings, manager)
		})
	}
}
