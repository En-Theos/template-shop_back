import { IsInt, IsOptional } from "class-validator"

export class ChangeProductParentDto {
	@IsInt({ message: 'ID продукту має бути цілим числом' })
	productId: number

	@IsOptional()
	@IsInt({ message: 'ID батьківського продукту має бути цілим числом' })
	parentProductId?: number
}