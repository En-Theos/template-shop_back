import { Type } from 'class-transformer'
import { IsArray, IsInt, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator'

export class CreateChildProductDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number

	@IsArray({ message: 'Список варіацій має бути масивом' })
	@ValidateNested({ each: true })
	@Type(() => NewVariation)
	variations: NewVariation[]
}

class NewVariation {
	@IsString({ message: 'SKU має бути рядком' })
	@MaxLength(100, { message: 'SKU не може перевищувати 100 символів' })
	sku: string
 
	@IsOptional()
	@IsArray({ message: 'Список значень характеристик має бути масивом' })
	@IsInt({
		each: true,
		message: 'ID значень характеристик мають бути цілими числами'
	})
	characteristicValueIds?: number[]
}
