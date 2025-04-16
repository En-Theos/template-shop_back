import { Controller } from '@nestjs/common'

import { RevisedService } from '../services/revised.service'

@Controller('revised')
export class RevisedController {
    constructor(private readonly revisedService: RevisedService) {}
}
