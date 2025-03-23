import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { ProductImage } from './schemes/product-image.scheme'
import { Product } from './schemes/product.scheme'

@Module({
	imports: [TypeOrmModule.forFeature([Product, ProductImage])],
	controllers: [ProductController],
	providers: [ProductService]
})
export class ProductModule {}
