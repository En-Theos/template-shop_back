import { IsInt, IsOptional } from "class-validator"

export class UpdateProductCategoryDto {
	@IsInt({ message: 'ID продукту має бути цілим числом' })
	productId: number

	@IsOptional()
	@IsInt({ message: 'ID нової категорії має бути цілим числом' })
	categoryId?: number
}