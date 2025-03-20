import { Module } from '@nestjs/common';
import { RevisedService } from './revised.service';
import { RevisedController } from './revised.controller';

@Module({
  controllers: [RevisedController],
  providers: [RevisedService],
})
export class RevisedModule {}
