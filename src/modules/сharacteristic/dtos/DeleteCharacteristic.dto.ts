import { Transform, Type } from "class-transformer";
import { IsArray, IsInt } from "class-validator";

export class DeleteCharacteristicDto {
	@Transform(({ value }) => (Array.isArray(value) ? value : [value]))
	@IsArray({ message: 'Список ID характеристик має бути масивом' })
	@IsInt({ each: true, message: 'ID характеристик мають бути цілими числами' })
	@Type(() => Number)
	сharacteristicIds: number[]
}
