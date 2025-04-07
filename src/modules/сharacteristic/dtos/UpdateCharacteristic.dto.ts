import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateCharacteristicDto {
	@IsInt({ message: 'ID характеристики має бути цілим числом' })
	@Type(() => Number)
	id: number

	@IsString({ message: 'Назва характеристики має бути рядком' })
	@MaxLength(255, { message: 'Назва характеристики не може перевищувати 255 символів' })
	@IsOptional()
	name?: string

	@IsString({ message: 'Група має бути рядком' })
	@MaxLength(255, { message: 'Група не може перевищувати 255 символів' })
	@IsOptional()
	group?: string

	@IsInt({ message: 'ID категорії має бути цілим числом' })
	@IsOptional()
	categoryId?: number
}
