import { Type } from 'class-transformer'
import { IsEmail, IsEnum, IsInt, IsOptional, IsPositive, IsString, Length, MaxLength } from 'class-validator'
import { EPaymentType } from 'src/interfaces/EPaymentType'

export class CreateOrderDto {
	@IsString({ message: 'Імʼя замовника обовʼязкове' })
	@Length(1, 50, { message: 'Імʼя має бути від 1 до 50 символів' })
	firstName: string

	@IsString({ message: 'Прізвище замовника обовʼязкове' })
	@Length(1, 50, { message: 'Прізвище має бути від 1 до 50 символів' })
	lastName: string

	@IsOptional()
	@IsEmail({}, { message: 'Некоректний email замовника' })
	email?: string

	@IsString({ message: 'Телефон замовника обовʼязковий' })
	@Length(7, 20, { message: 'Телефон має бути від 7 до 20 символів' })
	phone: string

	@IsString({ message: 'Імʼя отримувача обовʼязкове' })
	@Length(1, 50, { message: 'Імʼя має бути від 1 до 50 символів' })
	firstNameRecipient: string

	@IsString({ message: 'Прізвище отримувача обовʼязкове' })
	@Length(1, 50, { message: 'Прізвище має бути від 1 до 50 символів' })
	lastNameRecipient: string

	@IsOptional()
	@IsEmail({}, { message: 'Некоректний email отримувача' })
	emailRecipient?: string

	@IsString({ message: 'Телефон отримувача обовʼязковий' })
	@Length(7, 20, { message: 'Телефон має бути від 7 до 20 символів' })
	phoneRecipient: string

	@IsString({ message: 'Адреса доставки обовʼязкова' })
	@MaxLength(255, { message: 'Адреса не може перевищувати 255 символів' })
	deliveryAddresses: string

	@IsEnum(EPaymentType, { message: 'Некоректний тип оплати' })
	paymentType: EPaymentType

	@IsOptional()
	@IsString({ message: 'Коментар клієнта повинен бути текстом' })
	@MaxLength(255, { message: 'Коментар клієнта не може перевищувати 255 символів' })
	customerComment?: string

	@IsInt({ each: true, message: 'ID товарів має бути цілими числами' })
	@IsPositive({ each: true, message: 'ID товарів має бути додатніми числами' })
	@Type(() => Number)
	productIds: number[]
}
