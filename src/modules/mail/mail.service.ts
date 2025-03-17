import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IUser } from 'src/interfaces/IUser';
import { IToken } from 'src/interfaces/IToken';

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
                html: ""
            })
        } catch {
            throw new InternalServerErrorException("З якихось причин ми не змогли надіслати електронного листа для скидання пароля")
        }
    }
}
