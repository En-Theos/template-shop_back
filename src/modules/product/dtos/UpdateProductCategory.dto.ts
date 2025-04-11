import { Type } from "class-transformer"
import { IsArray, IsInt, IsOptional, ValidateNested } from "class-validator"

export class UpdateProductCategoryDtoMultiple {
	@ValidateNested({ each: true, message: 'Кожен елемент має бути валідним обʼєктом' })
	@IsArray({ message: 'Список змін має бути масивом' })
	@Type(() => UpdateProductCategoryDto)
	changes: UpdateProductCategoryDto[]
}

export class UpdateProductCategoryDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number

	@IsOptional()
	@IsInt({ message: 'ID нової категорії має бути цілим числом' })
	categoryId?: number
}