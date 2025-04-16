import { ERoleNames } from 'src/interfaces/ERoleNames'
import { Order } from 'src/modules/order/schemes/order.scheme'
import { Product } from 'src/modules/product/schemes/product.scheme'
import { Review } from 'src/modules/review/schemes/review.scheme'
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'

import { Token } from './token.scheme'

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

	@OneToMany(() => Token, token => token.user)
	tokens: Token[]

	@ManyToMany(() => Product)
	@JoinTable({ name: 'favorites' })
	favorites: Product[]

	@ManyToMany(() => Product)
	@JoinTable({ name: 'revised' })
	revised: Product[]

	@OneToMany(() => Review, review => review.user)
	reviews: Review[]

	@ManyToMany(() => Product)
	@JoinTable({ name: 'shopping_cart' })
	shoppingCart: Product[]

	@OneToMany(() => Order, order => order.user)
	orders: Order[]
}
