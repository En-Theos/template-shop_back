import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMySQLConfig } from '../configs/mysql.config';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync(getMySQLConfig()),
    AuthModule,
    TokenModule,
    UserModule,
    MailModule,
  ],
})
export class AppModule { }
