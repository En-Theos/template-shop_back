import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { User } from "../schemes/user.scheme";

export class UpdateUserInfoDto {
    @IsString({message: "Ім'я має бути рядком."})
    @IsOptional()
    firstName: User["firstName"];

    @IsString({message: "Прізвище має бути рядком."})
    @IsOptional()
    lastName: User["lastName"];

    @IsString({message: "По батькові має бути рядком."})
    @IsOptional()
    middleName: User["middleName"];

    @IsString({message: "Email має бути рядком."})
    @IsEmail({}, {message: "Неправильний формат email."})
    email: User["email"];

    @IsPhoneNumber("UA", {message: "Неправильний формат телефону"})
    @IsOptional()
    phone: User["phone"];
}