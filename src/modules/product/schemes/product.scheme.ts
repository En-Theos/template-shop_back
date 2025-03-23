import { Category } from 'src/modules/category/schemes/category.scheme'
import { Order } from 'src/modules/order/schemes/order.scheme'
import { Review } from 'src/modules/review/schemes/review.scheme'
import { Tag } from 'src/modules/tag/schemes/tag.scheme'
import { User } from 'src/modules/user/schemes/user.scheme'
import { CharacteristicValue } from 'src/modules/сharacteristic/schemes/сharacteristic-value.scheme'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { ProductImage } from './product-image.scheme'

@Entity({ name: 'products' })
export class Product {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Product, product => product.variations, { nullable: true })
	@JoinColumn({ name: 'parent_id' })
	parentProduct: Product | null

	@OneToMany(() => Product, product => product.parentProduct)
	variations: Product[]

	@Column({ type: 'varchar', unique: true, length: 100 })
	sku: string

	@Column({ type: 'varchar', length: 255 })
	name: string

	@Column({ type: 'text' })
	description: string

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
		transformer: {
			to: (value: number) => value,
			from: (value: string) => parseFloat(value)
		},
		unsigned: true
	})
	price: number

	@Column({ type: 'tinyint', unsigned: true, default: 0 })
	rating: number

	@OneToMany(() => ProductImage, image => image.product)
	images: ProductImage[]

	@ManyToMany(() => User)
	favorites: User[]

	@ManyToMany(() => User)
	revised: User[]

	@OneToMany(() => Review, review => review.product)
	reviews: Review[]

	@ManyToMany(() => User)
	shoppingCart: User[]

	@Column({ type: 'int', unsigned: true, default: 0 })
	availability: number

	@ManyToOne(() => Category, category => category.products, {
		nullable: true
	})
	@JoinColumn({ name: 'category_id' })
	category: Category | null

	@ManyToMany(() => CharacteristicValue)
	@JoinTable({ name: 'product_selected_char_values' })
	characteristics: CharacteristicValue[]

	@ManyToMany(() => Tag)
	@JoinTable({ name: 'product_selected_tags' })
	tags: Tag[]

	@ManyToMany(() => Order)
	orders: Order[]
}
