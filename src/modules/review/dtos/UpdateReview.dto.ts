import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator'

export class UpdateReviewDto {
	@IsOptional()
	@IsString({ message: 'Заголовок має бути рядком' })
	@MaxLength(255, { message: 'Заголовок не може перевищувати 255 символів' })
	title?: string

	@IsOptional()
	@IsString({ message: 'Вміст має бути рядком' })
    @MaxLength(1000, { message: 'Вміст не може перевищувати 1000 символів' })
	content?: string

	@IsOptional()
	@IsInt({ message: 'Оцінка має бути цілим числом' })
	@Min(1, { message: 'Мінімальна оцінка — 1' })
	@Max(5, { message: 'Максимальна оцінка — 5' })
	rating?: number
}
