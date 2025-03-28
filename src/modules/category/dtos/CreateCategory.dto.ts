import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateCategoryDto {
	@IsString({ message: 'Назва має бути рядком' })
	@MaxLength(255, { message: 'Назва не може перевищувати 255 символів' })
	name: string

	@IsInt({ message: 'ID батьківської категорії має бути цілим числом' })
	@IsOptional()
	parentCategoryId?: number
}
