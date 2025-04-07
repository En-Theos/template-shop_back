import { Injectable } from '@nestjs/common'

import { CreateCharacteristicDto } from './dtos/CreateCharacteristic.dto'
import { DeleteCharacteristicDto } from './dtos/DeleteCharacteristic.dto'
import { GetCharacteristicsDto } from './dtos/GetCharacteristics.dto'
import { UpdateCharacteristicDto } from './dtos/UpdateCharacteristic.dto'
import { CreateCharacteristicValueDto } from './dtos/CreateCharacteristicValue.dto'
import { DeleteCharacteristicValueDto } from './dtos/DeleteCharacteristicValue.dto'
import { UpdateCharacteristicValueDto } from './dtos/UpdateCharacteristicValue.dto'
import { IdParamDto } from 'src/dtos/IdParam.dto'

@Injectable()
export class СharacteristicService {
	async getCharacteristics(query: GetCharacteristicsDto) {}

	async createCharacteristic(dto: CreateCharacteristicDto) {}

	async updateCharacteristic(dto: UpdateCharacteristicDto) {}

	async deleteCharacteristic(query: DeleteCharacteristicDto) {}

	async createCharacteristicValue(dto: CreateCharacteristicValueDto) {}

	async updateCharacteristicValue(dto: IdParamDto & UpdateCharacteristicValueDto) {}
    
	async deleteCharacteristicValue(query: DeleteCharacteristicValueDto) {}
}
