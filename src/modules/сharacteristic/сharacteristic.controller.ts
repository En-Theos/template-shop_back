import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'

import { СharacteristicService } from './сharacteristic.service'

@Controller('сharacteristic')
export class СharacteristicController {
	constructor(
		private readonly сharacteristicService: СharacteristicService
	) {}
}
