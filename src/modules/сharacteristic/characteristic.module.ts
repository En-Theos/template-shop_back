import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CharacteristicValue } from './schemes/characteristic-value.scheme'
import { Characteristic } from './schemes/characteristic.scheme'
import { СharacteristicController } from './characteristic.controller'
import { СharacteristicService } from './characteristic.service'

@Module({
	imports: [TypeOrmModule.forFeature([Characteristic, CharacteristicValue])],
	controllers: [СharacteristicController],
	providers: [СharacteristicService]
})
export class СharacteristicModule {}
