import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UpdateUserInfoDto } from './dtos/UpdateUserInfo.dto'
import { IPublicUser, UserEntity } from './entities/user.entity'
import { User } from './schemes/user.scheme'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>
	) {}

	async getUserInfo(userId: IPublicUser['id']) {
		const userFromDB = await this.usersRepository.findOne({
			where: { id: userId },
			select: ['id','firstName','lastName','middleName','email','phone','role']
		})

		if (!userFromDB) {
			throw new NotFoundException('Такого користувача не знайдено')
		}

		return userFromDB
	}

	async updateUserInfo({
		userId,
		newData
	}: {
		userId: User['id']
		newData: UpdateUserInfoDto
	}): Promise<IPublicUser> {
		const userFromDB = await this.usersRepository.findOneBy({ id: userId })

		if (!userFromDB) {
			throw new NotFoundException('Такого користувача не знайдено')
		}

		const userEntity = new UserEntity(userFromDB).updateInfo(newData)

		await this.usersRepository.save(userEntity.getUser())

		return userEntity.getPublicUser()
	}

	async getAllUsersInfo() {
		return await this.usersRepository.find({
			select: ['id','firstName','lastName','middleName','email','phone','role'],
		})
	}
}
