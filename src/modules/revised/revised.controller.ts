import { Controller } from '@nestjs/common';
import { RevisedService } from './revised.service';

@Controller('revised')
export class RevisedController {
  constructor(private readonly revisedService: RevisedService) {}
}
