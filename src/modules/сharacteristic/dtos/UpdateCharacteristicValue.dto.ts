import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateCharacteristicValueDto {
	@IsString({ message: 'Назва значення має бути рядком' })
	@MaxLength(255, { message: 'Назва значення не може перевищувати 255 символів' })
	@IsOptional()
	name?: string

	@IsInt({ message: 'ID характеристики має бути цілим числом' })
	@IsOptional()
	characteristicId?: number
}
