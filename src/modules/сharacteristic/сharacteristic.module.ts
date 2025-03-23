import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CharacteristicValue } from './schemes/сharacteristic-value.scheme'
import { Characteristic } from './schemes/сharacteristic.scheme'
import { СharacteristicController } from './сharacteristic.controller'
import { СharacteristicService } from './сharacteristic.service'

@Module({
	imports: [TypeOrmModule.forFeature([Characteristic, CharacteristicValue])],
	controllers: [СharacteristicController],
	providers: [СharacteristicService]
})
export class СharacteristicModule {}
