import { Product } from 'src/modules/product/schemes/product.scheme'
import { Column,  Entity,  ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from './user.scheme'

@Entity({ name: 'shopping_cart' })
export class ShoppingCart {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'int', unsigned: true })
	quantity: number

	@ManyToOne(() => User, user => user.shoppingCart)
	public user: User

	@ManyToOne(() => Product, product => product.shoppingCart)
	public product: Product
}
