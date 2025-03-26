import { IsArray, IsInt } from "class-validator"

export class UpdateProductCharacteristicsDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number

	@IsArray({ message: 'Список значень характеристик має бути масивом' })
	@IsInt({ each: true, message: 'ID значень характеристик мають бути цілими числами' })
	characteristicValueIds: number[]
}