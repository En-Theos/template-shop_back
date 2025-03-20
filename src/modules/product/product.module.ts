import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './schemes/product.scheme';
import { ProductImage } from './schemes/product-image.scheme';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
