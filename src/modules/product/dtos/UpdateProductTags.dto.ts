import { IsArray, IsInt } from "class-validator"

export class UpdateProductTagsDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number

	@IsArray({ message: 'Список ID тегів має бути масивом' })
	@IsInt({ each: true, message: 'ID тегів мають бути цілими числами' })
	tagIds: number[]
}