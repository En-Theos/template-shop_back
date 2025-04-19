import { ETokenType } from 'src/interfaces/ETokenType'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

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

	@CreateDateColumn({ type: 'timestamp', select: false })
	createdAt: Date

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt: Date
}
