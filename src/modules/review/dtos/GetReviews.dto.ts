import { Type } from 'class-transformer'
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator'

export class GetReviewsDto {
	@IsOptional()
	@IsInt({ message: 'Номер сторінки має бути цілим числом' })
	@Min(1, { message: 'Номер сторінки має бути не менше 1' })
	@Type(() => Number)
	page?: number

	@IsOptional()
	@IsInt({ message: 'Кількість елементів на сторінці має бути цілим числом' })
	@Min(1, { message: 'Кількість елементів має бути не менше 1' })
	@Max(100, { message: 'Кількість елементів має бути не більше 100' })
	@Type(() => Number)
	limit?: number

	@IsOptional()
	@IsIn(['asc', 'desc'], { message: 'Сортування має бути або "asc", або "desc"' })
	sortRate?: 'asc' | 'desc'
}
