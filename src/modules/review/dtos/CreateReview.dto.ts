import { IsInt, IsString, Max, MaxLength, Min } from 'class-validator'

export class CreateReviewDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number

	@IsString({ message: 'Заголовок має бути рядком' })
	@MaxLength(255, { message: 'Заголовок не може перевищувати 255 символів' })
	title: string

	@IsString({ message: 'Вміст має бути рядком' })
    @MaxLength(1000, { message: 'Вміст не може перевищувати 1000 символів' })
	content: string

	@IsInt({ message: 'Оцінка має бути цілим числом' })
	@Min(1, { message: 'Мінімальна оцінка — 1' })
	@Max(5, { message: 'Максимальна оцінка — 5' })
	rating: number
}
