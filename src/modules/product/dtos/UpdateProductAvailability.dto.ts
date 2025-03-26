import { IsInt } from "class-validator"

export class UpdateProductAvailabilityDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number

	@IsInt({ message: 'Кількість має бути цілим числом' })
	availability: number
}