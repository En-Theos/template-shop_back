import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schemes/user.scheme';
import { Token } from './schemes/token.scheme';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    TypeOrmModule
  ]
})
export class UserModule {}
