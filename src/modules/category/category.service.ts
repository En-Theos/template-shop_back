import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IdParamDto } from 'src/dtos/IdParam.dto'
import { In, IsNull, Repository } from 'typeorm'

import { ChangeParentCategoryDtoMultiple } from './dtos/ChangeParentCategory.dto'
import { CreateCategoryDto } from './dtos/CreateCategory.dto'
import { DeleteProductDto } from './dtos/DeleteCategory.dto'
import { UpdateCategoryDto } from './dtos/UpdateCategory.dto'
import { Category } from './schemes/category.scheme'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>
	) {}

	async allCategories() {
		return await this.categoryRepository.find({
			where: {
				parentCategory: IsNull()
			},
			relations: {
				children: true,
				parentCategory: true
			}
		})
	}

	async createCategory(dto: CreateCategoryDto) {
		const exsistCategory = await this.categoryRepository.findOne({ where: { name: dto.name } })
		if (exsistCategory) throw new ConflictException('Категорія з таким іменем уже існує')

		const newCategory = this.categoryRepository.create({
			parentCategory: dto?.parentCategoryId ? { id: dto.parentCategoryId } : null,
			...dto
		})

		const createdCategory = await this.categoryRepository.save(newCategory)

		return await this.categoryRepository.findOne({
			where: { id: createdCategory.id },
			relations: {
				children: true,
				parentCategory: true
			}
		})
	}

	async updateCategory(dto: IdParamDto & UpdateCategoryDto) {
		const existingCategory = await this.categoryRepository.findOne({ where: { id: dto.id } })
		if (!existingCategory) throw new NotFoundException('Категорію не знайдено')

		const duplicateCategory = await this.categoryRepository.findOne({ where: { name: dto.name } })
		if (duplicateCategory && duplicateCategory.id !== dto.id) {
			throw new ConflictException('Категорія з таким іменем уже існує')
		}

		await this.categoryRepository.save({ ...existingCategory, ...dto })

		return await this.categoryRepository.findOne({
			where: { id: dto.id },
			relations: {
				children: true,
				parentCategory: true
			}
		})
	}

	async deleteCategory(query: DeleteProductDto) {
		await this.categoryRepository.delete({ id: In(query.categoryIds) })
	}

	async changeParentCategory(dto: ChangeParentCategoryDtoMultiple) {
		const updateValues = dto.changes
			.map(({ categoryId, parentCategoryId }) => {
				return `WHEN id = ${categoryId} THEN ${parentCategoryId || null}`
			})
			.join(' ')

		const categoryIds = dto.changes.map(({ categoryId }) => categoryId)

		await this.categoryRepository
			.createQueryBuilder()
			.update(Category)
			.set({
				parentCategory: () => `CASE ${updateValues} ELSE parent_id END`
			})
			.where('id IN (:...categoryIds)', { categoryIds })
			.execute()
	}
}
