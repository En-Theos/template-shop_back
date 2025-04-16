import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class UpdateUserInfoDto {
	@IsString({ message: "Ім'я має бути рядком." })
	firstName: string

	@IsString({ message: 'Прізвище має бути рядком.' })
	@IsOptional()
	lastName?: string

	@IsString({ message: 'По батькові має бути рядком.' })
	@IsOptional()
	middleName?: string

	@IsString({ message: 'Email має бути рядком.' })
	@IsEmail({}, { message: 'Неправильний формат email.' })
	email: string

	@IsPhoneNumber('UA', { message: 'Неправильний формат телефону' })
	@IsOptional()
	phone?: string
}
