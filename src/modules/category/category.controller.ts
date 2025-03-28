import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common'
import { Authorization } from 'src/decorators/auth.decorator'
import { ERoleNames } from 'src/interfaces/ERoleNames'

import { CategoryService } from './category.service'
import { ChangeParentCategoryDto } from './dtos/ChangeParentCategory.dto'
import { CreateCategoryDto } from './dtos/CreateCategory.dto'
import { DeleteProductDto } from './dtos/DeleteCategory.dto'
import { UpdateCategoryDto } from './dtos/UpdateCategory.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Authorization(ERoleNames.USER, ERoleNames.ADMIN)
	@Get('/')
	async allCategories() {}

	@Authorization(ERoleNames.ADMIN)
	@Post('/')
	async createCategory(@Body() dto: CreateCategoryDto) {}

	@Authorization(ERoleNames.ADMIN)
	@Put('/')
	async updateCategory(@Param() id: Pick<UpdateCategoryDto, 'id'>, @Body() dto: Pick<UpdateCategoryDto, 'name'>) {}

	@Authorization(ERoleNames.ADMIN)
	@Delete('/')
	async deleteCategory(@Query() query: DeleteProductDto) {}

	@Authorization(ERoleNames.ADMIN)
	@Patch('/change-parent')
	async changeParentCategory(@Body() dto: ChangeParentCategoryDto[]) {}
}
