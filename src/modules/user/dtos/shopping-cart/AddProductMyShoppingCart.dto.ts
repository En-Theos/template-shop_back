import { IsInt, IsPositive } from 'class-validator'

export class AddProductMyShoppingCartDto {
	@IsInt({ message: 'ID товару має бути цілим числом' })
	productId: number

	@IsInt({ message: 'Кількість доступних товарів має бути цілим числом' })
	@IsPositive({ message: 'Кількість має бути додатним числом' })
	quantity: number
}
