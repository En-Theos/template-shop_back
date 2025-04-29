import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from '../user/user.module'

import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { Order } from './schemes/order.scheme'

@Module({
	imports: [TypeOrmModule.forFeature([Order]), UserModule],
	controllers: [OrderController],
	providers: [OrderService]
})
export class OrderModule {}
