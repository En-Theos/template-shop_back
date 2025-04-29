import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm'

import { UpdateUserInfoDto } from '../dtos/user/UpdateUserInfo.dto'
import { IPublicUser, UserEntity } from '../entities/user.entity'
import { User } from '../schemes/user.scheme'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>
	) {}

	async getAndCheckUser(where: FindOptionsWhere<User> | FindOptionsWhere<User>[], relations?: FindOptionsRelations<User>) {
		const userFromDB = await this.usersRepository.findOne({
			where,
			select: ['id', 'firstName', 'lastName', 'middleName', 'email', 'phone', 'role'],
			relations
		})
		if (!userFromDB) throw new NotFoundException('Такого користувача не знайдено')

		return userFromDB
	}

	async getUserInfo(userId: IPublicUser['id']) {
		return await this.getAndCheckUser({id: userId})
	}

	async updateUserInfo({ userId, newData }: { userId: User['id']; newData: UpdateUserInfoDto }): Promise<IPublicUser> {
		const userFromDB = await this.getAndCheckUser({id: userId})

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
