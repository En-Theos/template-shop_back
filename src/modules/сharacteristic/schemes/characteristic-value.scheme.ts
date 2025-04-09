import { Product } from 'src/modules/product/schemes/product.scheme'
import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

import { Characteristic } from './characteristic.scheme'

@Entity({ name: 'characteristic_values' })
export class CharacteristicValue {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 255 })
	name: string

	@ManyToOne(() => Characteristic, characteristic => characteristic.values, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'characteristic_id' })
	characteristic: Characteristic

	@ManyToMany(() => Product)
	products: Product[]
}
