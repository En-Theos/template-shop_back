import { Type } from "class-transformer"
import { IsArray, IsInt, ValidateNested } from "class-validator"

export class UpdateProductAvailabilityDtoMultiple {
	@ValidateNested({ each: true, message: 'Кожен елемент має бути валідним обʼєктом' })
	@IsArray({ message: 'Список змін має бути масивом' })
	@Type(() => UpdateProductAvailabilityDto)
	changes: UpdateProductAvailabilityDto[]
}

export class UpdateProductAvailabilityDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number

	@IsInt({ message: 'Кількість має бути цілим числом' })
	availability: number
}