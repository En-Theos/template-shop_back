import { IsOptional, IsInt, IsString, MaxLength, IsNumber, IsPositive, IsArray, MinLength } from "class-validator"

export class UpdateProductDto {
	@IsOptional()
	@IsString({ message: 'Артикул має бути рядком' })
	@MaxLength(100, { message: 'Артикул не може перевищувати 100 символів' })
	sku?: string

	@IsOptional()
	@IsString({ message: 'Назва має бути рядком' })
	@MaxLength(255, { message: 'Назва не може перевищувати 255 символів' })
	name?: string

	@IsOptional()
	@IsString({ message: 'Опис має бути рядком' })
	description?: string

	@IsOptional()
	@IsNumber({}, { message: 'Ціна має бути числом' })
	@IsPositive({ message: 'Ціна має бути додатним числом' })
	price?: number

	@IsOptional()
	@IsArray({ message: 'Список зображень має бути масивом' })
	@IsInt({ each: true, message: 'ID зображень мають бути цілими числами' })
	imageIds?: number[]

	@IsOptional()
	@IsInt({ message: 'Кількість доступних товарів має бути цілим числом' })
	availability?: number

	@IsOptional()
	@IsInt({ message: 'ID категорії має бути цілим числом' })
	categoryId?: number

	@IsOptional()
	@IsArray({ message: 'Список значень характеристик має бути масивом' })
	@IsInt({ each: true, message: 'ID значень характеристик мають бути цілими числами' })
	characteristicValueIds?: number[]

	@IsOptional()
	@IsArray({ message: 'Список тегів має бути масивом' })
	@IsInt({ each: true, message: 'ID тегів мають бути цілими числами' })
	tagIds?: number[]
}