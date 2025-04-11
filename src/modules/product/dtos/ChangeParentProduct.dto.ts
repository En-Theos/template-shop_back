import { Type } from "class-transformer"
import { IsArray, IsInt, IsOptional, ValidateNested } from "class-validator"

export class ChangeParentProductDtoMultiple {
	@ValidateNested({ each: true, message: 'Кожен елемент має бути валідним обʼєктом' })
	@IsArray({ message: 'Список змін має бути масивом' })
	@Type(() => ChangeParentProductDto)
	changes: ChangeParentProductDto[]
}

export class ChangeParentProductDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number

	@IsOptional()
	@IsInt({ message: 'ID батьківського товару має бути цілим числом' })
	parentProductId?: number
}