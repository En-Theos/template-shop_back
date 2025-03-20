import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { СharacteristicService } from './сharacteristic.service';

@Controller('сharacteristic')
export class СharacteristicController {
  constructor(private readonly сharacteristicService: СharacteristicService) {}
}
