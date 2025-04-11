import { Type } from 'class-transformer'
import { IsArray, IsInt, ValidateNested } from 'class-validator'

export class UpdateProductTagsDtoMultiple {
	@ValidateNested({ each: true, message: 'Кожен елемент має бути валідним обʼєктом' })
	@IsArray({ message: 'Список змін має бути масивом' })
	@Type(() => UpdateProductTagsDto)
	changes: UpdateProductTagsDto[]
}

export class UpdateProductTagsDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number

	@IsArray({ message: 'Список ID тегів має бути масивом' })
	@IsInt({ each: true, message: 'ID тегів мають бути цілими числами' })
	tagIds: number[]
}
