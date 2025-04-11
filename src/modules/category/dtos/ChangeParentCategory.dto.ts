import { Type } from 'class-transformer'
import { IsArray, IsInt, IsOptional, ValidateNested } from 'class-validator'

export class ChangeParentCategoryDtoMultiple {
	@ValidateNested({ each: true, message: 'Кожен елемент має бути валідним обʼєктом' })
	@IsArray({ message: 'Список змін має бути масивом' })
	@Type(() => ChangeParentCategoryDto)
	changes: ChangeParentCategoryDto[]
}

export class ChangeParentCategoryDto {
	@IsInt({ message: 'ID категорії має бути цілим числом' })
	categoryId: number

	@IsInt({ message: 'Новий ID батьківської категорії має бути цілим числом' })
	@IsOptional()
	parentCategoryId?: number
}
