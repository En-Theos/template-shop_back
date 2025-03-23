import { Product } from 'src/modules/product/schemes/product.scheme'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tags' })
export class Tag {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 100, unique: true })
	type: string

	@Column({ type: 'varchar', length: 255 })
	name: string

	@ManyToMany(() => Product, product => product.tags)
	products: Product[]
}
