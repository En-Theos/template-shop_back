import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductModule } from '../product/product.module'

import { FavoriteController } from './controllers/favorite.controller'
import { RevisedController } from './controllers/revised.controller'
import { ShoppingCartController } from './controllers/shopping-cart.controller'
import { UserController } from './controllers/user.controller'
import { Revised } from './schemes/revised.scheme'
import { ShoppingCart } from './schemes/shopping-cart.scheme'
import { Token } from './schemes/token.scheme'
import { User } from './schemes/user.scheme'
import { FavoriteService } from './services/favorite.service'
import { RevisedService } from './services/revised.service'
import { ShoppingCartService } from './services/shopping-cart.service'
import { UserService } from './services/user.service'

@Module({
	imports: [TypeOrmModule.forFeature([User, Token, ShoppingCart, Revised]), ProductModule],
	controllers: [UserController, ShoppingCartController, RevisedController, FavoriteController],
	providers: [UserService, ShoppingCartService, RevisedService, FavoriteService],
	exports: [TypeOrmModule, UserService]
})
export class UserModule {}
