import { Module } from '@nestjs/common';
import { СharacteristicService } from './сharacteristic.service';
import { СharacteristicController } from './сharacteristic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Characteristic } from './schemes/сharacteristic.scheme';
import { CharacteristicValue } from './schemes/сharacteristic-value.scheme';

@Module({
  imports: [
    TypeOrmModule.forFeature([Characteristic, CharacteristicValue]),
  ],
  controllers: [СharacteristicController],
  providers: [СharacteristicService],
})
export class СharacteristicModule { }
