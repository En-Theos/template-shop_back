import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ERoleNames } from 'src/interfaces/ERoleNames'
import { ETokenType } from 'src/interfaces/ETokenType'
import { Repository } from 'typeorm'

import { MailService } from '../mail/mail.service'
import { TokenService } from '../token/token.service'
import { UserEntity } from '../user/entities/user.entity'
import { Token } from '../user/schemes/token.scheme'
import { User } from '../user/schemes/user.scheme'

import { ForgotPasswordDto } from './dtos/ForgotPassword.dto'
import { LoginDto } from './dtos/Login.dto'
import { RegistrationDto } from './dtos/Registration.dto'
import { ResetPasswordDto } from './dtos/ResetPassword.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		@InjectRepository(Token)
		private readonly tokenRepository: Repository<Token>,
		private readonly tokenService: TokenService,
		private readonly mailService: MailService
	) {}

	async register(dto: RegistrationDto): Promise<{
		refreshToken: string
		accessToken: string
	}> {
		if (await this.usersRepository.findOneBy({ email: dto.email })) {
			throw new ConflictException('Такий користувач уже існує')
		}

		const hashPassword = await UserEntity.hashPassword(dto.password)

		const publicUser = new UserEntity(
			await this.usersRepository.save({
				name: dto.name,
				email: dto.email,
				password: hashPassword,
				role: ERoleNames.USER
			})
		).getPublicUser()

		const refreshToken = await this.tokenService.generateRefreshToken({
			id: publicUser.id,
			role: publicUser.role
		})
		const accessToken = await this.tokenService.generateAccessToken({
			id: publicUser.id,
			role: publicUser.role
		})

		return {
			accessToken,
			refreshToken
		}
	}

	async login(dto: LoginDto): Promise<{
		refreshToken: string
		accessToken: string
	}> {
		const userFromDB = await this.usersRepository.findOneBy({
			email: dto.email
		})

		if (!userFromDB) {
			throw new UnauthorizedException('Неправильний логін чи пароль')
		}

		if (
			!(await UserEntity.validatePassword(
				dto.password,
				userFromDB.password
			))
		) {
			throw new UnauthorizedException('Неправильний логін чи пароль')
		}

		const publicUser = new UserEntity(userFromDB).getPublicUser()

		const refreshToken = await this.tokenService.generateRefreshToken({
			id: publicUser.id,
			role: publicUser.role
		})
		const accessToken = await this.tokenService.generateAccessToken({
			id: publicUser.id,
			role: publicUser.role
		})

		return {
			accessToken,
			refreshToken
		}
	}

	async refreshToken(refresh_token: string | undefined): Promise<{
		refreshToken: string
		accessToken: string
	}> {
		if (!refresh_token) {
			throw new UnauthorizedException('Користувач не авторизований')
		}

		const userFromToken =
			await this.tokenService.validateRefreshToken(refresh_token)
		const userFromDB = await this.usersRepository.findOneBy({
			id: userFromToken.id
		})

		if (!userFromToken || !userFromDB) {
			throw new UnauthorizedException('Користувач не авторизований')
		}

		const publicUser = new UserEntity(userFromDB).getPublicUser()

		const refreshToken = await this.tokenService.generateRefreshToken({
			id: publicUser.id,
			role: publicUser.role
		})
		const accessToken = await this.tokenService.generateAccessToken({
			id: publicUser.id,
			role: publicUser.role
		})

		return {
			accessToken,
			refreshToken
		}
	}

	async forgotPassword(dto: ForgotPasswordDto) {
		const { token, expiresIn } =
			this.tokenService.generateForgotPasswordToken()

		const user = await this.usersRepository.findOne({
			where: { email: dto.email },
			relations: {
				tokens: true
			}
		})

		if (user) {
			await this.mailService.sendEmailForgotPassword(dto.email, token)

			const userEntity = new UserEntity(user)

			userEntity.addToken(
				this.tokenRepository.create({
					token,
					type: ETokenType.RESET_PASSWORD,
					expiresIn,
					user
				})
			)

			this.usersRepository.save(userEntity.getUser())
		} else {
			throw new NotFoundException(
				'Користувача з таким email не знайдено.'
			)
		}
	}

	async resetPassword(dto: ResetPasswordDto) {
		const existToken = await this.tokenRepository.findOne({
			where: { token: dto.token },
			relations: {
				user: true
			}
		})

		if (existToken) {
			if (this.tokenService.validateForgotPasswordToken(existToken)) {
				const { user } = existToken

				user.password = await UserEntity.hashPassword(dto.password)

				this.tokenRepository.remove(existToken)
				this.usersRepository.save(user)
			} else {
				throw new BadRequestException(
					'Токен для скидування паролю недійсний або прострочений.'
				)
			}
		} else {
			throw new NotFoundException(
				'Такий токен для скидування паролю не знайдено.'
			)
		}
	}
}
