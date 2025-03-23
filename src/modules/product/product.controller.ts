import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common'
import { Authorization } from 'src/decorators/auth.decorator'
import { ERoleNames } from 'src/interfaces/ERoleNames'

import { ChangeProductParentDto } from './dtos/ChangeProductParent.dto'
import { CreateChildProductDto } from './dtos/CreateChildProduct.dto'
import { CreateProductDto } from './dtos/CreateProduct.dto'
import { DeleteProductDto } from './dtos/DeleteProduct.dto'
import { GetManyProductsDto } from './dtos/GetManyProducts.dto'
import { UpdateProductDto } from './dtos/UpdateProduct.dto'
import { UpdateProductAvailabilityDto } from './dtos/UpdateProductAvailability.dto'
import { UpdateProductCategoryDto } from './dtos/UpdateProductCategory.dto'
import { UpdateProductCharacteristicsDto } from './dtos/UpdateProductCharacteristics.dto'
import { UpdateProductTagsDto } from './dtos/UpdateProductTags.dto'
import { ProductService } from './product.service'
import { Product } from './schemes/product.scheme'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get('/')
	async getManyProducts(@Body() dto: GetManyProductsDto = { limit: 10, page: 1 }) {}

	@Get('/:id')
	async getOneProduct(@Param('id') id: Product['id']) {}

	@Authorization(ERoleNames.ADMIN)
	@Post('/')
	async createProduct(@Body() dto: CreateProductDto) {}

	@Authorization(ERoleNames.ADMIN)
	@Put('/:id')
	async updateProduct(@Param('id') id: Product['id'], @Body() dto: UpdateProductDto) {}

	@Authorization(ERoleNames.ADMIN)
	@Delete('/')
	async deleteProduct(@Body() dto: DeleteProductDto) {}

	@Authorization(ERoleNames.ADMIN)
	@Patch('characteristics')
	async updateProductCharacteristics(@Body() dto: UpdateProductCharacteristicsDto[]) {}

	@Authorization(ERoleNames.ADMIN)
	@Patch('tags')
	async updateProductTags(@Body() dto: UpdateProductTagsDto[]) {}

	@Authorization(ERoleNames.ADMIN)
	@Patch('parent')
	async changeProductParent(@Body() dto: ChangeProductParentDto[]) {}

	@Authorization(ERoleNames.ADMIN)
	@Post('children')
	async createChildProduct(@Body() dto: CreateChildProductDto[]) {}

	@Authorization(ERoleNames.ADMIN)
	@Patch('availability')
	async updateProductAvailability(@Body() dto: UpdateProductAvailabilityDto[]) {}

	@Authorization(ERoleNames.ADMIN)
	@Patch('category')
	async updateProductCategory(@Body() dto: UpdateProductCategoryDto[]) {}
}
