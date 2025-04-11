import { IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateTagDto {
	@IsString({ message: 'Тип має бути рядком' })
	@MaxLength(255, { message: 'Тип не може перевищувати 255 символів' })
	@IsOptional()
	type?: string

	@IsString({ message: 'Назва має бути рядком' })
	@MaxLength(255, { message: 'Назва не може перевищувати 255 символів' })
	@IsOptional()
	label?: string
}
