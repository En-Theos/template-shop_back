import { Type } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

export class GetCharacteristicsDto {
	@Type(() => Number)
	@IsInt({ message: 'ID категорії має бути цілим числом' })
	@IsOptional()
	categoryId?: number
}
