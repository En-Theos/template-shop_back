import { Type } from 'class-transformer'
import { IsArray, IsInt, IsString, MaxLength, ValidateNested } from 'class-validator'

class NewVariation {
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

export class CreateChildProductDto {
	@IsInt({ message: 'ID продукту має бути цілим числом' })
	productId: number

	@IsArray({ message: 'Список варіацій має бути масивом' })
	@ValidateNested({ each: true })
	@Type(() => NewVariation)
	variations: NewVariation[]
}
