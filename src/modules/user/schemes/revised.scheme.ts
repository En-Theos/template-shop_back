import { Product } from 'src/modules/product/schemes/product.scheme'
import { Entity,  ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from './user.scheme'

@Entity({ name: 'revised' })
export class Revised {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.revised)
    public user: User

    @ManyToOne(() => Product, product => product.revised)
    public product: Product
}
