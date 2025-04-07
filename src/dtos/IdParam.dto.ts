import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class IdParamDto {
    @Type(() => Number)
    @IsInt({ message: 'ID має бути цілим числом' })
    id: number;
  }