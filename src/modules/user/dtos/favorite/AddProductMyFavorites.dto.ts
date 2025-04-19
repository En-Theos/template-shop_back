import { IsInt } from 'class-validator'

export class AddProductMyFavoritesDto {
    @IsInt({ message: 'ID товару має бути цілим числом' })
    productId: number
}
