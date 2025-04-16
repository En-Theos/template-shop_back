import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { Authorization } from 'src/decorators/auth.decorator'
import { IdParamDto } from 'src/dtos/IdParam.dto'
import { ERoleNames } from 'src/interfaces/ERoleNames'

import { ITokenUser } from '../user/entities/user.entity'

import { CreateReviewDto } from './dtos/CreateReview.dto'
import { DeleteReviewsDto } from './dtos/DeleteReviews.dto'
import { GetReviewsDto } from './dtos/GetReviews.dto'
import { UpdateReviewDto } from './dtos/UpdateReview.dto'
import { ReviewService } from './review.service'

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Authorization(ERoleNames.ADMIN)
	@Get('recent')
	async getRecentReviews(@Query() query: GetReviewsDto) {
		return await this.reviewService.getRecentReviews(query)
	}

	@Get('/:id')
	async getProductReviews(@Param() param: IdParamDto, @Query() query: GetReviewsDto) {
		return await this.reviewService.getProductReviews(param, query)
	}

	@Authorization(ERoleNames.USER)
	@Post('/')
	async createReview(@Req() request: FastifyRequest, @Body() dto: CreateReviewDto) {
		const userFromToken = request.user as ITokenUser

		return await this.reviewService.createReview({ userId: userFromToken.id, ...dto })
	}

	@Authorization(ERoleNames.USER)
	@Put('/:id')
	async updateReview(@Param() param: IdParamDto, @Body() dto: UpdateReviewDto) {
		return await this.reviewService.updateReview({ ...param, ...dto })
	}

	@Authorization(ERoleNames.USER, ERoleNames.ADMIN)
	@Delete('/')
	async deleteReviews(@Query() query: DeleteReviewsDto) {
		return await this.reviewService.deleteReviews(query)
	}
}
