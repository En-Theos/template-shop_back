import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsRelations, Repository } from 'typeorm'

import { UpdateUserInfoDto } from '../dtos/user/UpdateUserInfo.dto'
import { IPublicUser, UserEntity } from '../entities/user.entity'
import { User } from '../schemes/user.scheme'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>
	) {}

	async checkExsistUser(id: User['id'], relations?: FindOptionsRelations<User>) {
		const userFromDB = await this.usersRepository.findOne({
			where: { id },
			select: ['id', 'firstName', 'lastName', 'middleName', 'email', 'phone', 'role'],
			relations
		})
		if (!userFromDB) throw new NotFoundException('Такого користувача не знайдено')

		return userFromDB
	}

	async getUserInfo(userId: IPublicUser['id']) {
		return await this.checkExsistUser(userId)
	}

	async updateUserInfo({ userId, newData }: { userId: User['id']; newData: UpdateUserInfoDto }): Promise<IPublicUser> {
		const userFromDB = await this.checkExsistUser(userId)

		const userEntity = new UserEntity(userFromDB).updateInfo(newData)

		await this.usersRepository.save(userEntity.getUser())

		return userEntity.getPublicUser()
	}

	async getAllUsersInfo() {
		return await this.usersRepository.find({
			select: ['id', 'firstName', 'lastName', 'middleName', 'email', 'phone', 'role']
		})
	}
}
