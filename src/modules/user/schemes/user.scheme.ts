import { ERoleNames } from 'src/interfaces/ERoleNames'
import { Order } from 'src/modules/order/schemes/order.scheme'
import { Product } from 'src/modules/product/schemes/product.scheme'
import { Review } from 'src/modules/review/schemes/review.scheme'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

import { ShoppingCart } from './shopping-cart.scheme'
import { Token } from './token.scheme'
import { Revised } from './revised.scheme'

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ name: 'first_name', type: 'varchar', length: 50 })
	firstName: string

	@Column({ name: 'last_name', type: 'varchar', length: 50, nullable: true })
	lastName: string | null

	@Column({
		name: 'middle_name',
		type: 'varchar',
		length: 50,
		nullable: true
	})
	middleName: string | null

	@Column({ type: 'varchar', length: 255, unique: true })
	email: string

	@Column({ type: 'varchar', length: 20, unique: true, nullable: true })
	phone: string

	@Column({ type: 'varchar', length: 255 })
	password: string

	@Column({ type: 'enum', enum: ERoleNames, default: ERoleNames.USER })
	role: ERoleNames

	@OneToMany(() => Token, token => token.user, {cascade: ["insert"]})
	tokens: Token[]

	@ManyToMany(() => Product)
	@JoinTable({ name: 'favorites' })
	favorites: Product[]

	@OneToMany(() => Revised, revised => revised.user)
	revised: Revised[]

	@OneToMany(() => Review, review => review.user)
	reviews: Review[]

	@OneToMany(() => ShoppingCart, shoppingCart => shoppingCart.user)
	shoppingCart: ShoppingCart[]

	@OneToMany(() => Order, order => order.user)
	orders: Order[]

	@CreateDateColumn({ type: 'timestamp', select: false })
	createdAt: Date

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt: Date
}
