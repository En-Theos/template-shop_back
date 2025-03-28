import { IsInt, IsString, MaxLength } from 'class-validator'

export class UpdateCategoryDto {
	@IsInt({ message: 'ID має бути цілим числом' })
	id: number

	@IsString({ message: 'Назва має бути рядком' })
	@MaxLength(255, { message: 'Назва не може перевищувати 255 символів' })
	name: string
}
