import { IsInt, IsString, MaxLength } from 'class-validator'

export class CreateCharacteristicValueDto {
	@IsString({ message: 'Назва значення має бути рядком' })
	@MaxLength(255, { message: 'Назва значення не може перевищувати 255 символів' })
	name: string

	@IsInt({ message: 'ID характеристики має бути цілим числом' })
	characteristicId: number
}
