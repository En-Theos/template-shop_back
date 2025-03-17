import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsString({ message: "Email має бути рядком." })
    @IsEmail({}, { message: "Неправильний формат email." })
    email: string;

    @IsString({ message: "Пароль має бути рядком." })
    @MinLength(6, { message: "Пароль має містити мінімум 6 символів" })
    password: string;
}