import { IsInt, IsOptional } from "class-validator"

export class ChangeParentProductDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number

	@IsOptional()
	@IsInt({ message: 'ID батьківського товару має бути цілим числом' })
	parentProductId?: number
}