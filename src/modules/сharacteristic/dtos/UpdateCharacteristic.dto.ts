import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateCharacteristicDto {
	@IsString({ message: 'Назва характеристики має бути рядком' })
	@MaxLength(255, { message: 'Назва характеристики не може перевищувати 255 символів' })
	@IsOptional()
	name?: string

	@IsString({ message: 'Група має бути рядком' })
	@MaxLength(255, { message: 'Група не може перевищувати 255 символів' })
	@IsOptional()
	group?: string

	@IsBoolean()
	@IsOptional()
	isVariation?: boolean

	@IsInt({ message: 'ID категорії має бути цілим числом' })
	@IsOptional()
	categoryId?: number
}
