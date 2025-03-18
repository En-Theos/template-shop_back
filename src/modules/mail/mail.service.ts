import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IUser } from 'src/interfaces/IUser';
import { IToken } from 'src/interfaces/IToken';
import { render } from '@react-email/components';
import { ForgotPasswordTemplate } from './templates/ForgotPassword.template';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    async sendEmailForgotPassword(email: IUser["email"], token: IToken["token"]) {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: "",
                html: await render(ForgotPasswordTemplate({link: "http://localhost:3000/auth/forgot-password/" + token}))
            })
        } catch {
            throw new InternalServerErrorException("З якихось причин ми не змогли надіслати електронного листа для скидання пароля")
        }
    }
}
