import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common'
import { Authorization } from 'src/decorators/auth.decorator'
import { IdParamDto } from 'src/dtos/IdParam.dto'
import { ERoleNames } from 'src/interfaces/ERoleNames'

import { ChangeParentProductDtoMultiple } from './dtos/ChangeParentProduct.dto'
import { CreateChildProductDto } from './dtos/CreateChildProduct.dto'
import { CreateProductDto } from './dtos/CreateProduct.dto'
import { DeleteProductDto } from './dtos/DeleteProduct.dto'
import { GetManyProductsDto } from './dtos/GetManyProducts.dto'
import { UpdateProductDto } from './dtos/UpdateProduct.dto'
import { UpdateProductAvailabilityDtoMultiple } from './dtos/UpdateProductAvailability.dto'
import { UpdateProductCategoryDtoMultiple } from './dtos/UpdateProductCategory.dto'
import { UpdateProductCharacteristicsDtoMultiple } from './dtos/UpdateProductCharacteristics.dto'
import { UpdateProductTagsDtoMultiple } from './dtos/UpdateProductTags.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get('/')
	async getManyProducts(@Query() query: GetManyProductsDto) {
		return await this.productService.getManyProducts(query)
	}

	@Get('/:id')
	async getOneProduct(@Param() param: IdParamDto) {
		return await this.productService.getOneProduct(param.id)
	}

	@Authorization(ERoleNames.ADMIN)
	@Post('/')
	async createProduct(@Body() dto: CreateProductDto) {
		return await this.productService.createProduct(dto)
	}

	@Authorization(ERoleNames.ADMIN)
	@Put('/:id')
	async updateProduct(@Param() param: IdParamDto, @Body() dto: UpdateProductDto) {
		return await this.productService.updateProduct({ ...param, ...dto })
	}

	@Authorization(ERoleNames.ADMIN)
	@Delete('/')
	async deleteProduct(@Query() query: DeleteProductDto) {
		return await this.productService.deleteProduct(query)
	}

	@Authorization(ERoleNames.ADMIN)
	@Patch('characteristics')
	async updateProductCharacteristics(@Body() dto: UpdateProductCharacteristicsDtoMultiple) {
		return await this.productService.updateProductCharacteristics(dto)
	}

	@Authorization(ERoleNames.ADMIN)
	@Patch('tags')
	async updateProductTags(@Body() dto: UpdateProductTagsDtoMultiple) {
		return await this.productService.updateProductTags(dto)
	}

	@Authorization(ERoleNames.ADMIN)
	@Patch('parent')
	async changeParentProduct(@Body() dto: ChangeParentProductDtoMultiple) {
		return await this.productService.changeParentProduct(dto)
	}

	@Authorization(ERoleNames.ADMIN)
	@Post('childrens')
	async createChildProduct(@Body() dto: CreateChildProductDto) {
		return await this.productService.createChildProduct(dto)
	}

	@Authorization(ERoleNames.ADMIN)
	@Patch('availability')
	async updateProductAvailability(@Body() dto: UpdateProductAvailabilityDtoMultiple) {
		return await this.productService.updateProductAvailability(dto)
	}

	@Authorization(ERoleNames.ADMIN)
	@Patch('category')
	async updateProductCategory(@Body() dto: UpdateProductCategoryDtoMultiple) {
		return await this.productService.updateProductCategory(dto)
	}
}
