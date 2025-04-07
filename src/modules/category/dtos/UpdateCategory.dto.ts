import { IsString, MaxLength } from 'class-validator'

export class UpdateCategoryDto {
	@IsString({ message: 'Назва має бути рядком' })
	@MaxLength(255, { message: 'Назва не може перевищувати 255 символів' })
	name: string
}
