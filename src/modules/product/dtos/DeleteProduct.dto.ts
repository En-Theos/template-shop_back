import { IsArray, IsInt } from 'class-validator'

export class DeleteProductDto {
	@IsArray({ message: 'Список ID товарів має бути масивом' })
	@IsInt({ each: true, message: 'ID товарів мають бути цілими числами' })
	productIds: number[]
}
