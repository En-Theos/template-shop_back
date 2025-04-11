import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IdParamDto } from 'src/dtos/IdParam.dto'
import { In, Repository } from 'typeorm'

import { CreateCharacteristicDto } from './dtos/CreateCharacteristic.dto'
import { CreateCharacteristicValueDto } from './dtos/CreateCharacteristicValue.dto'
import { DeleteCharacteristicDto } from './dtos/DeleteCharacteristic.dto'
import { DeleteCharacteristicValueDto } from './dtos/DeleteCharacteristicValue.dto'
import { GetCharacteristicsDto } from './dtos/GetCharacteristics.dto'
import { UpdateCharacteristicDto } from './dtos/UpdateCharacteristic.dto'
import { UpdateCharacteristicValueDto } from './dtos/UpdateCharacteristicValue.dto'
import { CharacteristicValue } from './schemes/characteristic-value.scheme'
import { Characteristic } from './schemes/characteristic.scheme'

@Injectable()
export class СharacteristicService {
	constructor(
		@InjectRepository(Characteristic)
		private readonly characteristicsRepository: Repository<Characteristic>,

		@InjectRepository(CharacteristicValue)
		private readonly characteristicValuesRepository: Repository<CharacteristicValue>
	) {}

	async getCharacteristics(query: GetCharacteristicsDto) {
		return await this.characteristicsRepository.find({
			where: { category: { id: query.categoryId } },
			relations: { values: true }
		})
	}

	async createCharacteristic(dto: CreateCharacteristicDto) {
		const exsistCharacteristic = await this.characteristicsRepository.findOne({
			where: { name: dto.name, category: { id: dto.categoryId } }
		})
		if (exsistCharacteristic) throw new ConflictException('Характеристика з таким іменем в цій категорії уже існує')

		const newCharacteristic = this.characteristicsRepository.create({
			...dto,
			category: dto?.categoryId ? { id: dto.categoryId } : null
		})

		const createdCharacteristic = await this.characteristicsRepository.save(newCharacteristic)

		return await this.characteristicsRepository.findOne({
			where: { id: createdCharacteristic.id },
			relations: {
				category: true
			}
		})
	}

	async updateCharacteristic(dto: IdParamDto & UpdateCharacteristicDto) {
		const exsistCharacteristic = await this.characteristicsRepository.findOne({
			where: { id: dto.id },
			relations: {
				category: true
			}
		})
		if (!exsistCharacteristic) throw new NotFoundException('Характеристику не знайдено')

		const duplicateCharacteristic = await this.characteristicsRepository.findOne({
			where: {
				name: dto.name || exsistCharacteristic.name,
				category: { id: dto.categoryId || exsistCharacteristic.category?.id }
			}
		})
		if (duplicateCharacteristic && duplicateCharacteristic.id !== dto.id) {
			throw new ConflictException('Характеристика з таким іменем в цій категорії уже існує')
		}

		await this.characteristicsRepository.save({ ...exsistCharacteristic, ...dto, category: { id: dto.categoryId } })

		return await this.characteristicsRepository.findOne({
			where: { id: dto.id },
			relations: {
				category: true
			}
		})
	}

	async deleteCharacteristics(query: DeleteCharacteristicDto) {
		await this.characteristicsRepository.delete({ id: In(query.characteristicIds) })
	}

	async createCharacteristicValue(dto: CreateCharacteristicValueDto) {
		const exsistCharacteristicValue = await this.characteristicValuesRepository.findOne({
			where: { name: dto.name, characteristic: { id: dto.characteristicId } }
		})
		if (exsistCharacteristicValue) throw new ConflictException('В цій характеристиці уже існує таке значення')

		const newCharacteristicValue = this.characteristicValuesRepository.create({
			...dto,
			characteristic: { id: dto.characteristicId }
		})

		const createdCharacteristicValue = await this.characteristicValuesRepository.save(newCharacteristicValue)

		return await this.characteristicValuesRepository.findOne({
			where: { id: createdCharacteristicValue.id },
			relations: {
				characteristic: true
			}
		})
	}

	async updateCharacteristicValue(dto: IdParamDto & UpdateCharacteristicValueDto) {
		const exsistCharacteristicValue = await this.characteristicValuesRepository.findOne({
			where: { id: dto.id },
			relations: {
				characteristic: true
			}
		})
		if (!exsistCharacteristicValue) throw new NotFoundException('Значення характеристики не знайдено')

		const duplicateCharacteristicValue = await this.characteristicValuesRepository.findOne({
			where: {
				name: dto.name || exsistCharacteristicValue.name,
				characteristic: { id: dto.characteristicId || exsistCharacteristicValue.characteristic.id }
			}
		})
		if (duplicateCharacteristicValue && duplicateCharacteristicValue.id !== dto.id) {
			throw new ConflictException('В цій характеристиці уже існує таке значення')
		}

		await this.characteristicValuesRepository.save({
			...exsistCharacteristicValue,
			...dto,
			characteristic: { id: dto.characteristicId }
		})

		return await this.characteristicValuesRepository.findOne({
			where: { id: dto.id },
			relations: {
				characteristic: true
			}
		})
	}

	async deleteCharacteristicValue(query: DeleteCharacteristicValueDto) {
		await this.characteristicValuesRepository.delete({ id: In(query.characteristicValueIds) })
	}
}
