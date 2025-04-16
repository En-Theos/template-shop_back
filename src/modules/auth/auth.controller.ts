import { Body, Controller, Get, HttpCode, InternalServerErrorException, Patch, Post, Put, Req, Res } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'

import { AuthService } from './auth.service'
import { ForgotPasswordDto } from './dtos/ForgotPassword.dto'
import { LoginDto } from './dtos/Login.dto'
import { RegistrationDto } from './dtos/Registration.dto'
import { ResetPasswordDto } from './dtos/ResetPassword.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('registration')
	async registration(@Body() dto: RegistrationDto, @Res({ passthrough: true }) response: FastifyReply): Promise<void> {
		const data = await this.authService.register(dto)
		response.setCookie('refresh_token', data.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			path: '/'
		})
		response.setCookie('access_token', data.accessToken, {
			maxAge: 30 * 60 * 1000,
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			path: '/'
		})
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: FastifyReply): Promise<void> {
		const data = await this.authService.login(dto)
		response.setCookie('refresh_token', data.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			path: '/'
		})
		response.setCookie('access_token', data.accessToken, {
			maxAge: 30 * 60 * 1000,
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			path: '/'
		})
	}

	@HttpCode(200)
	@Post('logout')
	async logout(@Res({ passthrough: true }) response: FastifyReply): Promise<void> {
		try {
			response.clearCookie('refresh_token')
			response.clearCookie('access_token')
		} catch (error) {
			throw new InternalServerErrorException('Непередбачувана помилка')
		}
	}

	@HttpCode(200)
	@Put('forgot-password')
	async forgotPassword(@Body() dto: ForgotPasswordDto) {
		await this.authService.forgotPassword(dto)
	}

	@HttpCode(200)
	@Patch('reset-password')
	async resetPassword(@Body() dto: ResetPasswordDto) {
		await this.authService.resetPassword(dto)
	}

	@Get('refresh')
	async refreshToken(@Req() request: FastifyRequest, @Res({ passthrough: true }) response: FastifyReply): Promise<void> {
		const refresh_token = request.cookies['refresh_token']

		const data = await this.authService.refreshToken(refresh_token)
		response.setCookie('refresh_token', data.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			path: '/'
		})
		response.setCookie('access_token', data.accessToken, {
			maxAge: 30 * 60 * 1000,
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			path: '/'
		})
	}
}
