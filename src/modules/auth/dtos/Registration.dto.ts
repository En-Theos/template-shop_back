import { IsEmail, IsOptional, IsString, MinLength, Validate } from "class-validator";
import { IsPasswordsEqual } from "src/decorators/is-passwords-equal.decorator";

export class RegistrationDto {
    @IsString({message: "Ім'я має бути рядком."})
    @IsOptional()
    name?: string;

    @IsString({message: "Email має бути рядком."})
    @IsEmail({}, {message: "Неправильний формат email."})
    email: string;

    @IsString({message: "Пароль має бути рядком."})
    @MinLength(6, {message: "Пароль має містити мінімум 6 символів"})
    password: string;

    @IsString({message: "Пароль підтвердження має бути рядком."})
    @MinLength(6, {message: "Пароль підтвердження має містити мінімум 6 символів"})
    @Validate(IsPasswordsEqual)
    passwordСonfirmation: string
}