import { IsArray, IsInt } from 'class-validator'

export class DeleteProductDto {
	@IsArray({ message: 'Список ID продуктів має бути масивом' })
	@IsInt({ each: true, message: 'ID продуктів мають бути цілими числами' })
	productIds: number[]
}
