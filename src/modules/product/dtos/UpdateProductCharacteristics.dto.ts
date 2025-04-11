import { Type } from "class-transformer"
import { IsArray, IsInt, ValidateNested } from "class-validator"

export class UpdateProductCharacteristicsDtoMultiple {
	@ValidateNested({ each: true, message: 'Кожен елемент має бути валідним обʼєктом' })
	@IsArray({ message: 'Список змін має бути масивом' })
	@Type(() => UpdateProductCharacteristicsDto)
	changes: UpdateProductCharacteristicsDto[]
}

export class UpdateProductCharacteristicsDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number

	@IsArray({ message: 'Список значень характеристик має бути масивом' })
	@IsInt({ each: true, message: 'ID значень характеристик мають бути цілими числами' })
	characteristicValueIds: number[]
}