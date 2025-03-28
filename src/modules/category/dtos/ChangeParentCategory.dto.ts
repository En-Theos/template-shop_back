import { IsInt, IsOptional } from 'class-validator'

export class ChangeParentCategoryDto {
	@IsInt({ message: 'ID категорії має бути цілим числом' })
	categoryId: number

	@IsInt({ message: 'Новий ID батьківської категорії має бути цілим числом' })
	@IsOptional()
	newParentCategoryId?: number
}
