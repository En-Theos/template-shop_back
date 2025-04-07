import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IdParamDto } from 'src/dtos/IdParam.dto'
import { In, Repository } from 'typeorm'

import { ChangeParentProductDto } from './dtos/ChangeParentProduct.dto'
import { CreateChildProductDto } from './dtos/CreateChildProduct.dto'
import { CreateProductDto } from './dtos/CreateProduct.dto'
import { DeleteProductDto } from './dtos/DeleteProduct.dto'
import { GetManyProductsDto } from './dtos/GetManyProducts.dto'
import { UpdateProductDto } from './dtos/UpdateProduct.dto'
import { UpdateProductAvailabilityDto } from './dtos/UpdateProductAvailability.dto'
import { UpdateProductCategoryDto } from './dtos/UpdateProductCategory.dto'
import { UpdateProductCharacteristicsDto } from './dtos/UpdateProductCharacteristics.dto'
import { UpdateProductTagsDto } from './dtos/UpdateProductTags.dto'
import { Product } from './schemes/product.scheme'

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productsRepository: Repository<Product>
	) {}

	async getManyProducts(dto: GetManyProductsDto) {
		const query = this.productsRepository.createQueryBuilder('products')

		// Завантажуємо відношення "images"
		query.leftJoinAndSelect('products.images', 'product_images', '', { limit: 1 })

		// Фільтрація за категорією
		if (dto.categoryId) {
			query.andWhere('products.category_id = :categoryId', { categoryId: dto.categoryId })
		} else if (dto.categoryId) {
			query.andWhere('products.category_id IS NULL')
		}

		// Фільтрація за тегами
		if (dto?.tagIds && dto.tagIds.length > 0) {
			query.andWhere(
				`products.id IN (
				SELECT productId FROM product_selected_tags WHERE tagId IN (:...tagIds)
			)`,
				{ tagIds: dto.tagIds }
			)
		}

		// Фільтрація за характеристиками
		if (dto?.characteristicValueIds && dto.characteristicValueIds.length > 0) {
			query.andWhere(
				`products.id IN (
				SELECT productId FROM product_selected_char_values WHERE characteristicValueId IN (:...characteristicValueIds)
			)`,
				{ characteristicValueIds: dto.characteristicValueIds }
			)
		}

		// Фільтрація за ціною
		if (dto?.minPrice) {
			query.andWhere('products.price >= :minPrice', { minPrice: dto.minPrice })
		}

		if (dto?.maxPrice) {
			query.andWhere('products.price <= :maxPrice', { maxPrice: dto.maxPrice })
		}

		// Пошук за SKU
		if (dto?.sku) {
			query.andWhere('products.sku LIKE :sku', { sku: `%${dto.sku}%` })
		}

		// Пошук за name
		if (dto?.name) {
			query.andWhere('products.name LIKE :name', { name: `%${dto.name}%` })
		}

		const page = dto?.page ?? 1
		const limit = dto?.limit ?? 10
		query.skip((page - 1) * limit).take(limit)

		return query.getMany()
	}

	async getOneProduct(id: IdParamDto["id"]) {
		const product = await this.productsRepository.findOne({
			where: { id },
			relations: {
				images: true,
				parentProduct: true,
				variations: true,
				characteristics: true,
				tags: true,
				reviews: true
			}
		})
		if (!product) throw new NotFoundException('Товар не знайдено')
		return product
	}

	async createProduct(dto: CreateProductDto) {
		const exsistProduct = await this.productsRepository.findOne({ where: { sku: dto.sku } })
		if (exsistProduct) throw new ConflictException('Товар з таким артикулом уже існує')

		const newProduct = this.productsRepository.create({
			parentProduct: dto?.parentProductId ? { id: dto.parentProductId } : null,
			...dto
		})

		const createdProduct = await this.productsRepository.save(newProduct)

		return await this.productsRepository.findOne({
			where: { id: createdProduct.id },
			relations: {
				images: true,
				characteristics: true,
				tags: true,
				reviews: true
			}
		})
	}

	async updateProduct(dto: IdParamDto & UpdateProductDto) {
		const existingProduct = await this.productsRepository.findOne({ where: { id: dto.id } })
		if (!existingProduct) throw new NotFoundException('Товар не знайдено')

		if (dto.sku) {
			const duplicateProduct = await this.productsRepository.findOne({ where: { sku: dto.sku } })
			if (duplicateProduct && duplicateProduct.id !== dto.id) {
				throw new ConflictException('Товар з таким артикулом уже існує')
			}
		}

		await this.productsRepository.save({ ...existingProduct, ...dto })

		return await this.productsRepository.findOne({
			where: { id: dto.id },
			relations: {
				images: true,
				characteristics: true,
				tags: true,
				reviews: true
			}
		})
	}

	async deleteProduct(query: DeleteProductDto) {
		await this.productsRepository.delete({ id: In(query.productIds) })
	}

	async updateProductCharacteristics(dto: UpdateProductCharacteristicsDto[]) {
		const queryRunner = this.productsRepository.manager.connection.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()

		try {
			const productIds = dto.map(item => item.productId)
			await queryRunner.manager
				.createQueryBuilder()
				.delete()
				.from('product_selected_char_values')
				.where('productsId IN (:...productIds)', { productIds })
				.execute()

			const insertValues = dto.flatMap(({ productId, characteristicValueIds }) =>
				characteristicValueIds.map(charId => ({ productsId: productId, characteristicValuesId: charId }))
			)

			if (insertValues.length > 0) {
				await queryRunner.manager
					.createQueryBuilder()
					.insert()
					.into('product_selected_char_values')
					.values(insertValues)
					.execute()
			}

			await queryRunner.commitTransaction()
		} catch (error) {
			await queryRunner.rollbackTransaction()
			throw error
		} finally {
			await queryRunner.release()
		}
	}

	async updateProductTags(dto: UpdateProductTagsDto[]) {
		const queryRunner = this.productsRepository.manager.connection.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()

		try {
			const productIds = dto.map(item => item.productId)
			await queryRunner.manager
				.createQueryBuilder()
				.delete()
				.from('product_selected_tags')
				.where('productsId IN (:...productIds)', { productIds })
				.execute()

			const insertValues = dto.flatMap(({ productId, tagIds }) =>
				tagIds.map(tagId => ({ productsId: productId, tagsId: tagId }))
			)

			if (insertValues.length > 0) {
				await queryRunner.manager
					.createQueryBuilder()
					.insert()
					.into('product_selected_tags')
					.values(insertValues)
					.execute()
			}

			await queryRunner.commitTransaction()
		} catch (error) {
			await queryRunner.rollbackTransaction()
			throw new InternalServerErrorException(error)
		} finally {
			await queryRunner.release()
		}
	}

	async changeParentProduct(dto: ChangeParentProductDto[]) {
		const updateValues = dto
			.map(({ productId, parentProductId }) => {
				return `WHEN id = ${productId} THEN ${parentProductId || null}`
			})
			.join(' ')

		const productIds = dto.map(({ productId }) => productId)

		await this.productsRepository
			.createQueryBuilder()
			.update(Product)
			.set({
				parentProduct: () => `CASE ${updateValues} ELSE parent_id END`
			})
			.where('id IN (:...productIds)', { productIds })
			.execute()
	}

	async createChildProduct(dto: CreateChildProductDto) {
		// Створення транзакції
		const queryRunner = this.productsRepository.manager.connection.createQueryRunner()
		await queryRunner.startTransaction()

		try {
			const parentProduct = await queryRunner.manager.findOne(Product, { where: { id: dto.productId } })

			if (!parentProduct) {
				throw new NotFoundException('Товар не знайдено')
			}

			const SKUArr = dto.variations.map(item => item.sku)

			const existsChildren = await queryRunner.manager.find(Product, { where: { sku: In(SKUArr) } })

			if (existsChildren.length > 0) {
				throw new ConflictException('Товар з таким артикулом уже існує')
			}

			if (SKUArr.length !== new Set(SKUArr).size) {
				throw new ConflictException('Артикули всіх варіацій повинні бути унікальними')
			}

			// Створення дочірніх товарів в межах транзакції
			for (const { sku, characteristicValueIds } of dto.variations) {
				const newChild = this.productsRepository.create({
					...parentProduct,
					id: undefined,
					sku,
					parentProduct,
					characteristics: (characteristicValueIds || []).map(id => ({ id }))
				})

				await queryRunner.manager.save(newChild) // Використовуємо queryRunner для транзакції
			}

			// Коміт транзакції
			await queryRunner.commitTransaction()
		} catch (error) {
			// Якщо щось пішло не так — відкатуємо транзакцію
			await queryRunner.rollbackTransaction()
			throw error
		} finally {
			// Закриваємо queryRunner після завершення
			await queryRunner.release()
		}
	}

	async updateProductAvailability(dto: UpdateProductAvailabilityDto[]) {
		const updateValues = dto
			.map(({ productId, availability }) => {
				return `WHEN id = ${productId} THEN ${availability}`
			})
			.join(' ')

		const productIds = dto.map(({ productId }) => productId)

		await this.productsRepository
			.createQueryBuilder()
			.update(Product)
			.set({
				availability: () => `CASE ${updateValues} ELSE availability END`
			})
			.where('id IN (:...productIds)', { productIds })
			.execute()
	}

	async updateProductCategory(dto: UpdateProductCategoryDto[]) {
		const updateValues = dto
			.map(({ productId, categoryId }) => {
				return `WHEN id = ${productId} THEN ${categoryId}`
			})
			.join(' ')

		const productIds = dto.map(({ productId }) => productId)

		await this.productsRepository
			.createQueryBuilder()
			.update(Product)
			.set({
				category: () => `CASE ${updateValues} ELSE category_id END`
			})
			.where('id IN (:...productIds)', { productIds })
			.execute()
	}
}
