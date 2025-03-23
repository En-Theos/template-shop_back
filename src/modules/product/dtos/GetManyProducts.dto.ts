import { Type } from 'class-transformer'
import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min } from 'class-validator'

export class GetManyProductsDto {
	@IsOptional()
	@IsString({ message: 'Артикул має бути рядком' })
	@MaxLength(100, { message: 'Артикул не може перевищувати 100 символів' })
	sku?: string

	@IsOptional()
	@IsString({ message: 'Назва має бути рядком' })
	@MaxLength(255, { message: 'Назва не може перевищувати 255 символів' })
	name?: string

	@IsOptional()
	@IsInt({ message: 'ID категорії має бути цілим числом' })
	@Type(() => Number)
	categoryId?: number

	@IsOptional()
	@IsInt({ each: true, message: 'ID тегів мають бути цілими числами' })
	@Type(() => Number)
	tagIds?: number[]

	@IsOptional()
	@IsArray({ message: 'Список значень характеристик має бути масивом' })
	@IsInt({ each: true, message: 'ID значень характеристик мають бути цілими числами' })
	@Type(() => Number)
	characteristicValueIds?: number[]

	@IsOptional()
	@IsNumber({}, { message: 'Мінімальна ціна має бути числом' })
	@IsPositive({ message: 'Мінімальна ціна має бути додатним числом' })
	@Type(() => Number)
	minPrice?: number

	@IsOptional()
	@IsNumber({}, { message: 'Максимальна ціна має бути числом' })
	@IsPositive({ message: 'Максимальна ціна має бути додатним числом' })
	@Type(() => Number)
	maxPrice?: number

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
}
