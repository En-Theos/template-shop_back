import { EDeliveryStatus } from 'src/interfaces/EDeliveryStatus'
import { EOrderStatus } from 'src/interfaces/EOrderStatus'
import { EPaymentStatus } from 'src/interfaces/EPaymentStatus'
import { EPaymentType } from 'src/interfaces/EPaymentType'
import { Product } from 'src/modules/product/schemes/product.scheme'
import { User } from 'src/modules/user/schemes/user.scheme'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'orders' })
export class Order {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ name: 'first_name', type: 'varchar', length: 50 })
	firstName: string

	@Column({ name: 'last_name', type: 'varchar', length: 50 })
	lastName: string

	@Column({ type: 'varchar', length: 255, nullable: true })
	email: string

	@Column({ type: 'varchar', length: 20 })
	phone: string

	@Column({ name: 'first_name_recipient', type: 'varchar', length: 50 })
	firstNameRecipient: string

	@Column({ name: 'last_name_recipient', type: 'varchar', length: 50 })
	lastNameRecipient: string

	@Column({name: 'email_recipient', type: 'varchar', length: 255, nullable: true })
	emailRecipient: string

	@Column({name: 'phone_recipient', type: 'varchar', length: 20 })
	phoneRecipient: string

	@ManyToOne(() => User, user => user.orders)
	@JoinColumn({ name: 'user_id' })
	user: User 

	@Column({ type: 'varchar', name: 'delivery_addresses', length: 255 })
	deliveryAddresses: string

	@ManyToMany(() => Product, product => product.orders)
	@JoinTable({ name: 'product_orders' })
	products: Product[]

	@Column({
		name: 'order_status',
		type: 'enum',
		enum: EOrderStatus,
		default: EOrderStatus.PROCESSING
	})
	orderStatus: EOrderStatus

	@Column({
		name: 'delivery_status',
		type: 'enum',
		enum: EDeliveryStatus,
		default: EDeliveryStatus.EXPECTS
	})
	deliveryStatus: EDeliveryStatus

	@Column({
		name: 'payment_status',
		type: 'enum',
		enum: EPaymentStatus,
		default: EPaymentStatus.UNPAID
	})
	paymentStatus: EPaymentStatus

	@Column({
		name: 'payment_type',
		type: 'enum',
		enum: EPaymentType,
		default: EPaymentType.ONLINE
	})
	paymentType: EPaymentType

	@Column({ type: 'varchar', name: 'сustomer_comment', length: 255, nullable: true })
	сustomerComment: string

	@Column({ type: 'varchar', name: 'manager_comment', length: 255, nullable: true })
	managerComment: string

	@CreateDateColumn({ type: 'timestamp', select: false })
	createdAt: Date

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt: Date
}
