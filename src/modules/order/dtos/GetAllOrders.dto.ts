import { Transform, Type } from 'class-transformer'
import { IsDateString, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'
import { EDeliveryStatus } from 'src/interfaces/EDeliveryStatus'
import { EOrderStatus } from 'src/interfaces/EOrderStatus'
import { EPaymentStatus } from 'src/interfaces/EPaymentStatus'

export class GetAllOrdersDto {
	@IsOptional()
	@IsEnum(EOrderStatus, { message: 'Статус замовлення має бути коректним значенням' })
	orderStatus?: EOrderStatus

	@IsOptional()
	@IsEnum(EDeliveryStatus, { message: 'Статус доставки має бути коректним значенням' })
	deliveryStatus?: EDeliveryStatus

	@IsOptional()
	@IsEnum(EDeliveryStatus, { message: 'Статус оплати має бути коректним значенням' })
	paymentStatus?: EPaymentStatus

	@IsOptional()
	@IsDateString({}, { message: 'Дата "від" має бути у форматі ISO-8601 (2025-04-28 або 2024-04-28T00:00:00Z)' })
	@Transform(({ value }) => (value ? new Date(value) : undefined))
	dateFrom?: string

	@IsOptional()
	@IsDateString({}, { message: 'Дата "до" має бути у форматі ISO-8601 (2025-04-28 або 2024-04-28T00:00:00Z)' })
	@Transform(({ value }) => (value ? new Date(value) : undefined))
	dateTo?: string

	@IsOptional()
	@IsInt({ message: 'Номер сторінки має бути цілим числом' })
	@Min(1, { message: 'Номер сторінки має бути не менше 1' })
	@Type(() => Number)
	page?: number

	@IsOptional()
	@IsInt({ message: 'Кількість елементів на сторінці має бути цілим числом' })
	@Min(1, { message: 'Кількість елементів має бути не менше 1' })
	@Max(100, { message: 'Кількість елементів має бути не більше 100' })
	@Type(() => Number)
	limit?: number
}
