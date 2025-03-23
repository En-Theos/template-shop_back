import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

import { Product } from './product.scheme'

@Entity({ name: 'product_images' })
export class ProductImage {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 500, nullable: false })
	url: string

	@ManyToOne(() => Product, product => product.images)
	@JoinColumn({ name: 'product_id' })
	product: Product
}
