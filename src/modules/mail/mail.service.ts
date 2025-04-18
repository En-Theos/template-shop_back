import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { render } from '@react-email/components'

import { Token } from '../user/schemes/token.scheme'
import { User } from '../user/schemes/user.scheme'

import { ForgotPasswordTemplate } from './templates/ForgotPassword.template'

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	async sendEmailForgotPassword(email: User['email'], token: Token['token']) {
		try {
			await this.mailerService.sendMail({
				to: email,
				subject: '',
				html: await render(
					ForgotPasswordTemplate({
						link:
							'http://localhost:3000/auth/forgot-password/' +
							token
					})
				)
			})
		} catch {
			throw new InternalServerErrorException(
				'З якихось причин ми не змогли надіслати електронного листа для скидання пароля'
			)
		}
	}
}
