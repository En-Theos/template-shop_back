import { Product } from 'src/modules/product/schemes/product.scheme'
import { User } from 'src/modules/user/schemes/user.scheme'
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'reviews' })
export class Review {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Product, product => product.reviews)
	@JoinColumn({ name: 'product_id' })
	product: Product

	@ManyToOne(() => User, user => user.reviews)
	@JoinColumn({ name: 'user_id' })
	user: User

	@Column({ type: 'varchar', length: 255, nullable: false })
	title: string

	@Column({ type: 'text', nullable: false })
	content: string

	@Column({ type: 'tinyint', unsigned: true, default: 1 })
	rating: number
}
