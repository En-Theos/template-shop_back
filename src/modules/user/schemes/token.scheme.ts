import { ETokenType } from 'src/interfaces/ETokenType'
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

import { User } from './user.scheme'

@Entity({ name: 'tokens' })
export class Token {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'uuid', unique: true })
	token: string

	@Column({
		type: 'datetime',
		name: 'expires_in',
		default: () => 'CURRENT_TIMESTAMP'
	})
	expiresIn: Date

	@Column({ type: 'enum', enum: ETokenType })
	type: ETokenType

	@ManyToOne(() => User, user => user.tokens)
	@JoinColumn({ name: 'user_id' })
	user: User
}
