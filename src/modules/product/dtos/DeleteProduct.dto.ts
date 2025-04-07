import { Transform, Type } from 'class-transformer'
import { IsArray, IsInt } from 'class-validator'

export class DeleteProductDto {
	@Transform(({ value }) => (Array.isArray(value) ? value : [value]))
	@IsArray({ message: 'Список ID товарів має бути масивом' })
	@IsInt({ each: true, message: 'ID товарів мають бути цілими числами' })
	@Type(() => Number)
	productIds: number[]
}
