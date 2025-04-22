import { IsInt } from 'class-validator'

export class AddProductMyRevisedDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number
}
