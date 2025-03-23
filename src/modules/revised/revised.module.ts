import { Module } from '@nestjs/common'

import { RevisedController } from './revised.controller'
import { RevisedService } from './revised.service'

@Module({
	controllers: [RevisedController],
	providers: [RevisedService]
})
export class RevisedModule {}
