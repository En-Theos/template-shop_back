import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductModule } from '../product/product.module'

import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'
import { Review } from './schemes/review.scheme'

@Module({
	imports: [TypeOrmModule.forFeature([Review]), ProductModule],
	controllers: [ReviewController],
	providers: [ReviewService]
})
export class ReviewModule {}
