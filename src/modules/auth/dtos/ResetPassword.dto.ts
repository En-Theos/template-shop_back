import { IsString, IsUUID, MinLength, Validate } from "class-validator";
import { IsPasswordsEqual } from "src/decorators/is-passwords-equal.decorator";

export class ResetPasswordDto {
    @IsUUID(4, {message: "Неправильний формат токена."})
    token: string;

    @IsString({message: "Пароль має бути рядком."})
    @MinLength(6, {message: "Пароль має містити мінімум 6 символів"})
    password: string;

    @IsString({message: "Пароль підтвердження має бути рядком."})
    @MinLength(6, {message: "Пароль підтвердження має містити мінімум 6 символів"})
    @Validate(IsPasswordsEqual)
    passwordСonfirmation: string
}