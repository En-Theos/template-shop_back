import { Transform, Type } from "class-transformer";
import { IsArray, IsInt } from "class-validator";

export class DeleteTagsDto {
	@Transform(({ value }) => (Array.isArray(value) ? value : [value]))
	@IsArray({ message: 'Список ID тегів має бути масивом' })
	@IsInt({ each: true, message: 'ID тегів мають бути цілими числами' })
	@Type(() => Number)
	tagsIds: number[]
}
