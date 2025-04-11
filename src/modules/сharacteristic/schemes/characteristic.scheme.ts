import { Category } from 'src/modules/category/schemes/category.scheme'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { CharacteristicValue } from './characteristic-value.scheme'

@Entity({ name: 'characteristics' })
export class Characteristic {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 255 })
	name: string

	@Column({ type: 'varchar', length: 255, nullable: true })
	group: string

	@Column({ type: 'boolean', default: false, name: "is_variation" })
	isVariation: boolean

	@ManyToOne(() => Category, category => category.characteristics)
	@JoinColumn({ name: 'category_id' })
	category: Category | null

	@OneToMany(() => CharacteristicValue, characteristicValue => characteristicValue.characteristic)
	values: CharacteristicValue[]
}
