import { IsArray, IsInt, IsString, MaxLength } from 'class-validator'

export class CreateChildProductDto {
	@IsString({ message: 'SKU має бути рядком' })
	@MaxLength(100, { message: 'SKU не може перевищувати 100 символів' })
	sku: string

	@IsArray({ message: 'Список значень характеристик має бути масивом' })
	@IsInt({
		each: true,
		message: 'ID значень характеристик мають бути цілими числами'
	})
	characteristicValueIds: number[]
}
