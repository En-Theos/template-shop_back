import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { Authorization } from 'src/decorators/auth.decorator'
import { IdParamDto } from 'src/dtos/IdParam.dto'
import { ERoleNames } from 'src/interfaces/ERoleNames'

import { CreateTagDto } from './dtos/CreateTag.dto'
import { DeleteTagsDto } from './dtos/DeleteTags.dto'
import { UpdateTagDto } from './dtos/UpdateTag.dto'
import { TagService } from './tag.service'

@Controller('tag')
export class TagController {
	constructor(private readonly tagService: TagService) {}

	@Get('/')
	async getTags() {
		return await this.tagService.getTags()
	}

	@Authorization(ERoleNames.ADMIN)
	@Post('/')
	async createTag(@Body() dto: CreateTagDto) {
		return await this.tagService.createTag(dto)
	}

	@Authorization(ERoleNames.ADMIN)
	@Put('/:id')
	async updateTag(@Param() param: IdParamDto, @Body() dto: UpdateTagDto) {
		return await this.tagService.updateTag({ ...param, ...dto })
	}

	@Authorization(ERoleNames.ADMIN)
	@Delete('/')
	async deleteTags(@Query() query: DeleteTagsDto) {
		return await this.tagService.deleteTags(query)
	}
}
