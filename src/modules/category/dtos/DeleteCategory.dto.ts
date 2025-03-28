import { IsArray, IsInt } from 'class-validator'

export class DeleteProductDto {
    @IsArray({ message: 'Список ID категорій має бути масивом' })
    @IsInt({ each: true, message: 'ID категорій мають бути цілими числами' })
    categoryIds: number[]
}