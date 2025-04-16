import { Transform, Type } from 'class-transformer'
import { IsArray, IsInt } from 'class-validator'

export class DeleteReviewsDto {
	@Transform(({ value }) => (Array.isArray(value) ? value : [value]))
	@IsArray({ message: 'Список ID відгуків має бути масивом' })
	@IsInt({ each: true, message: 'ID відгуків мають бути цілими числами' })
	@Type(() => Number)
	reviewIds: number[]
}
