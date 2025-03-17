import { Body, Controller, Get, Put, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Authorization } from 'src/decorators/auth.decorator';
import { ERoleNames } from 'src/interfaces/ERoleNames';
import { Request } from "express"
import { IPublicUser, ITokenUser } from 'src/interfaces/IUser';
import { UpdateUserInfoDto } from './dtos/UpdateUserInfo.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Authorization(ERoleNames.USER)
  @Get("/")
  async userInfo(@Req() request: Request): Promise<IPublicUser> {
    const userFromToken = request.user as ITokenUser;

    return await this.userService.getUserInfo(userFromToken.id)
  }

  @Authorization(ERoleNames.USER)
  @Put("/")
  async updateUserInfo(@Body() dto: UpdateUserInfoDto, @Req() request: Request): Promise<IPublicUser> {
    const userFromToken = request.user as ITokenUser;

    const newUser = this.userService.updateUserInfo({
      userId: userFromToken.id,
      newData: dto
    });

    return newUser;
  }
}
