import { IsInt, IsOptional } from 'class-validator'

export class GetCharacteristicsDto {
	@IsInt({ message: 'ID категорії має бути цілим числом' })
	@IsOptional()
	categoryId?: number
}
