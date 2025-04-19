import { Product } from 'src/modules/product/schemes/product.scheme'
import { Characteristic } from 'src/modules/сharacteristic/schemes/characteristic.scheme'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'categories' })
export class Category {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 255 })
	name: string

	@OneToMany(() => Product, product => product.category)
	products: Product[]

	@ManyToOne(() => Category, category => category.children, {
		nullable: true
	})
	@JoinColumn({ name: 'parent_id' })
	parentCategory: Category | null

	@OneToMany(() => Category, category => category.parentCategory)
	children: Category[]

	@OneToMany(() => Characteristic, characteristic => characteristic.category)
	characteristics: Characteristic[]

	@CreateDateColumn({ type: 'timestamp', select: false })
	createdAt: Date

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt: Date
}
