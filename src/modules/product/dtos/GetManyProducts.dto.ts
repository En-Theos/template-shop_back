import { IsOptional, IsInt, IsArray, IsNumber, IsPositive, Min, Max } from "class-validator"

export class GetManyProductsDto {
	@IsOptional()
	@IsInt({ message: 'ID категорії має бути цілим числом' })
	categoryId?: number

	@IsOptional()
	@IsInt({ each: true, message: 'ID тегів мають бути цілими числами' })
	tagIds?: number[]

	@IsOptional()
	@IsArray({ message: 'Список значень характеристик має бути масивом' })
	@IsInt({ each: true, message: 'ID значень характеристик мають бути цілими числами' })
	characteristicValueIds?: number[]

	@IsOptional()
	@IsNumber({}, { message: 'Мінімальна ціна має бути числом' })
	@IsPositive({ message: 'Мінімальна ціна має бути додатним числом' })
	minPrice?: number

	@IsOptional()
	@IsNumber({}, { message: 'Максимальна ціна має бути числом' })
	@IsPositive({ message: 'Максимальна ціна має бути додатним числом' })
	maxPrice?: number

	@IsOptional()
	@IsInt({ message: 'Номер сторінки має бути цілим числом' })
	@Min(1, { message: 'Номер сторінки має бути не менше 1' })
	page?: number

	@IsOptional()
	@IsInt({ message: 'Кількість елементів на сторінці має бути цілим числом' })
	@Min(1, { message: 'Кількість елементів має бути не менше 1' })
	@Max(100, { message: 'Кількість елементів має бути не більше 100' })
	limit?: number
}