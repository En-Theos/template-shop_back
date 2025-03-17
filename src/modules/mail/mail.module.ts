import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from "@nestjs-modules/mailer";
import { getMailerConfig } from 'src/configs/mailer.config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync(getMailerConfig())
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
 