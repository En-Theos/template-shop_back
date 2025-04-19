import { EDeliveryStatus } from 'src/interfaces/EDeliveryStatus'
import { EOrderStatus } from 'src/interfaces/EOrderStatus'
import { Product } from 'src/modules/product/schemes/product.scheme'
import { User } from 'src/modules/user/schemes/user.scheme'
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'orders' })
export class Order {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToMany(() => Product, product => product.orders)
	@JoinTable({ name: 'product_orders' })
	products: Product[]

	@ManyToOne(() => User, user => user.orders)
	@JoinColumn({ name: 'user_id' })
	user: User

	@Column({
		name: 'order_status',
		type: 'enum',
		enum: EOrderStatus,
		default: EOrderStatus.ACCEPTED
	})
	orderStatus: EOrderStatus

	@Column({
		name: 'delivery_status',
		type: 'enum',
		enum: EDeliveryStatus,
		default: EDeliveryStatus.EXPECTS
	})
	deliveryStatus: EDeliveryStatus

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	date: Date

	@Column({ type: 'text', name: 'сustomer_comment' })
	сustomerComment: string

	@Column({ type: 'text', name: 'manager_comment' })
	managerComment: string

	@Column({ type: 'json', name: 'delivery_info' })
	deliveryInfo: string

	@CreateDateColumn({ type: 'timestamp', select: false })
	createdAt: Date

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt: Date
}
