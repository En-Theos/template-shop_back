import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { TokenService } from "../token/token.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/schemes/user.scheme";
import { Repository } from "typeorm";
import { ERoleNames } from "src/interfaces/ERoleNames";
import { UserEntity } from "../user/entities/user.entity";
import { RegistrationDto } from "./dtos/Registration.dto";
import { LoginDto } from "./dtos/Login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly tokenService: TokenService
    ) { }

    async register(dto: RegistrationDto): Promise<{
        refreshToken: string;
        accessToken: string;
    }> {
        if (await this.usersRepository.findOneBy({ email: dto.email })) {
            throw new ConflictException("Такий користувач уже існує")
        }

        const hashPassword = await UserEntity.hashPassword(dto.password);

        const publicUser = new UserEntity(
            await this.usersRepository.save({
                name: dto.name,
                email: dto.email,
                password: hashPassword,
                role: ERoleNames.USER
            })
        ).getPublicUser()

        const refreshToken = await this.tokenService.generateRefreshToken({id: publicUser.id, role: publicUser.role});
        const accessToken = await this.tokenService.generateAccessToken({id: publicUser.id, role: publicUser.role});

        return {
            accessToken,
            refreshToken
        }
    }

    async login(dto: LoginDto): Promise<{
        refreshToken: string;
        accessToken: string;
    }> {
        const userFromDB = await this.usersRepository.findOneBy({ email: dto.email })

        if (!userFromDB) {
            throw new UnauthorizedException("Неправильний логін чи пароль")
        }

        if (!UserEntity.validatePassword(dto.password, userFromDB.password)) {
            throw new UnauthorizedException("Неправильний логін чи пароль")
        }

        const publicUser = new UserEntity(userFromDB).getPublicUser()

        const refreshToken = await this.tokenService.generateRefreshToken({id: publicUser.id, role: publicUser.role});
        const accessToken = await this.tokenService.generateAccessToken({id: publicUser.id, role: publicUser.role});

        return {
            accessToken,
            refreshToken
        }
    }

    async refreshToken(refresh_token: string): Promise<{
        refreshToken: string;
        accessToken: string;
    }> {
        if (!refresh_token) {
            throw new UnauthorizedException("Користувач не авторизований")
        }

        const userFromToken = await this.tokenService.validateRefreshToken(refresh_token)
        const userFromDB = await this.usersRepository.findOneBy({ id: userFromToken.id })

        if (!userFromToken || !userFromDB) {
            throw new UnauthorizedException("Користувач не авторизований")
        }

        const publicUser = new UserEntity(userFromDB).getPublicUser()

        const refreshToken = await this.tokenService.generateRefreshToken({id: publicUser.id, role: publicUser.role});
        const accessToken = await this.tokenService.generateAccessToken({id: publicUser.id, role: publicUser.role});

        return {
            accessToken,
            refreshToken
        }
    }
}