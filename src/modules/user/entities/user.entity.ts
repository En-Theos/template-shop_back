import * as bcrypt from 'bcrypt'
import { ERoleNames } from 'src/interfaces/ERoleNames'
import { Order } from 'src/modules/order/schemes/order.scheme'
import { Product } from 'src/modules/product/schemes/product.scheme'
import { Review } from 'src/modules/review/schemes/review.scheme'

import { Token } from '../schemes/token.scheme'
import { User } from '../schemes/user.scheme'

export type IPublicUser = Omit<User, 'password'>

export type ITokenUser = Pick<User, 'id' | 'role'>

export class UserEntity {
	private id: number
	private firstName: string | null
	private lastName: string | null
	private middleName: string | null
	private email: string
	private phone: string
	private password: string
	private role: ERoleNames
	private tokens: Token[]
	private favorites: Product[]
	private revised: Product[]
	private reviews: Review[]
	private shoppingCart: Product[]
	private orders: Order[]

	constructor(userRepo: User) {
		this.id = userRepo.id
		this.firstName = userRepo.firstName
		this.lastName = userRepo.lastName
		this.middleName = userRepo.middleName
		this.email = userRepo.email
		this.phone = userRepo.phone
		this.password = userRepo.password
		this.role = userRepo.role
		this.tokens = userRepo.tokens
		this.favorites = userRepo.favorites
		this.revised = userRepo.revised
		this.reviews = userRepo.reviews
		this.shoppingCart = userRepo.shoppingCart
		this.orders = userRepo.orders
	}

	public getPublicUser(): IPublicUser {
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			middleName: this.middleName,
			email: this.email,
			phone: this.phone,
			role: this.role,
			tokens: this.tokens,
			favorites: this.favorites,
			revised: this.revised,
			reviews: this.reviews,
			shoppingCart: this.shoppingCart,
			orders: this.orders
		}
	}

	public getUser(): User {
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			middleName: this.middleName,
			email: this.email,
			phone: this.phone,
			password: this.password,
			role: this.role,
			tokens: this.tokens,
			favorites: this.favorites,
			revised: this.revised,
			reviews: this.reviews,
			shoppingCart: this.shoppingCart,
			orders: this.orders
		}
	}

	public addToken(token: Token) {
		if (this.tokens) {
			this.tokens = this.tokens.filter(item => item.type !== token.type)
			this.tokens.push(token)
		} else {
			this.tokens = [token]
		}
	}

	public updateInfo(
		data: Pick<
			User,
			'firstName' | 'lastName' | 'middleName' | 'email' | 'phone'
		>
	): this {
		this.firstName = data.firstName
		this.lastName = data.lastName
		this.middleName = data.middleName
		this.email = data.email
		this.phone = data.phone

		return this
	}

	public static async hashPassword(
		password: User['password']
	): Promise<User['password']> {
		const salt = await bcrypt.genSalt(10)

		return await bcrypt.hash(password, salt)
	}

	public static async validatePassword(
		passwordFromReq: User['password'],
		passwordFromDB: User['password']
	): Promise<boolean> {
		return await bcrypt.compare(passwordFromReq, passwordFromDB)
	}
}
