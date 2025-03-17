import { IsEmail, IsString } from "class-validator";

export class ForgotPasswordDto {
    @IsString({ message: "Email має бути рядком." })
    @IsEmail({}, { message: "Неправильний формат email." })
    email: string;
}