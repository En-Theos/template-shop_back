import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { Authorization } from 'src/decorators/auth.decorator'
import { ERoleNames } from 'src/interfaces/ERoleNames'

import { CreateCharacteristicDto } from './dtos/CreateCharacteristic.dto'
import { DeleteCharacteristicDto } from './dtos/DeleteCharacteristic.dto'
import { GetCharacteristicsDto } from './dtos/GetCharacteristics.dto'
import { UpdateCharacteristicDto } from './dtos/UpdateCharacteristic.dto'
import { СharacteristicService } from './сharacteristic.service'
import { CreateCharacteristicValueDto } from './dtos/CreateCharacteristicValue.dto'
import { DeleteCharacteristicValueDto } from './dtos/DeleteCharacteristicValue.dto'

@Controller('сharacteristic')
export class СharacteristicController {
	constructor(private readonly сharacteristicService: СharacteristicService) {}

	@Get('/')
	async getCharacteristics(@Query() query: GetCharacteristicsDto) {
		return await this.сharacteristicService.getCharacteristics(query)
	}

	@Authorization(ERoleNames.ADMIN)
	@Post('/')
	async createCharacteristic(@Body() dto: CreateCharacteristicDto) {
		return await this.сharacteristicService.createCharacteristic(dto)
	}

	@Authorization(ERoleNames.ADMIN)
	@Put('/:id')
	async updateCharacteristic(@Param('id') id: UpdateCharacteristicDto['id'], @Body() dto: Omit<UpdateCharacteristicDto, "id">) {
		return await this.сharacteristicService.updateCharacteristic({id, ...dto})
	}

	@Authorization(ERoleNames.ADMIN)
	@Delete('/')
	async deleteCharacteristic(@Query() query: DeleteCharacteristicDto) {
		return await this.сharacteristicService.deleteCharacteristic(query)
	}

	@Authorization(ERoleNames.ADMIN)
	@Post('value')
	async createCharacteristicValue(@Body() dto: CreateCharacteristicValueDto) {
		return await this.сharacteristicService.createCharacteristicValue(dto);
	}

	@Authorization(ERoleNames.ADMIN)
	@Delete('value')
	async deleteCharacteristicValue(@Query() query: DeleteCharacteristicValueDto) {
		return await this.сharacteristicService.deleteCharacteristicValue(query)
	}
}
