import { Category } from 'src/modules/category/schemes/category.scheme'
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'

import { CharacteristicValue } from './сharacteristic-value.scheme'

@Entity({ name: 'characteristics' })
export class Characteristic {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 255 })
	name: string

	@Column({ type: 'varchar', length: 255 })
	group: string

	@ManyToOne(() => Category, category => category.characteristics)
	@JoinColumn({ name: 'category_id' })
	category: Category

	@OneToMany(
		() => CharacteristicValue,
		characteristicValue => characteristicValue.characteristic
	)
	values: CharacteristicValue[]
}
