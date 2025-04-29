import { IsOptional, IsEnum, IsString, MaxLength } from "class-validator"
import { EDeliveryStatus } from "src/interfaces/EDeliveryStatus"
import { EOrderStatus } from "src/interfaces/EOrderStatus"
import { EPaymentStatus } from "src/interfaces/EPaymentStatus"

export class UpdateOrderInfoDto {
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
	@IsString({message: "Коментар менеджера має бути рядком"})
	@MaxLength(255, { message: 'Коментар менеджера не може перевищувати 255 символів' })
	managerComment?: string
}
