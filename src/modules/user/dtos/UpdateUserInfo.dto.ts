import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserInfoDto {
    @IsString({message: "Ім'я має бути рядком."})
    @IsOptional()
    name?: string;

    @IsString({message: "Email має бути рядком."})
    @IsEmail({}, {message: "Неправильний формат email."})
    email: string;
}