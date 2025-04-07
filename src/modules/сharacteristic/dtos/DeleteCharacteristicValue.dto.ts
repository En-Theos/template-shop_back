import { Transform, Type } from "class-transformer";
import { IsArray, IsInt } from "class-validator";

export class DeleteCharacteristicValueDto {
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    @IsArray({ message: 'Список ID значень характеристик має бути масивом' })
    @IsInt({ each: true, message: 'ID значень характеристик мають бути цілими числами' })
    @Type(() => Number)
    сharacteristicValueIds: number[]
}