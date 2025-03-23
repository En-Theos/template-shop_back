import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { getMySQLConfig } from '../configs/mysql.config'

import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { FavoritesModule } from './favorites/favorites.module'
import { MailModule } from './mail/mail.module'
import { OrderModule } from './order/order.module'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './review/review.module'
import { RevisedModule } from './revised/revised.module'
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module'
import { TagModule } from './tag/tag.module'
import { TokenModule } from './token/token.module'
import { UserModule } from './user/user.module'
import { СharacteristicModule } from './сharacteristic/сharacteristic.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env'
		}),
		TypeOrmModule.forRootAsync(getMySQLConfig()),
		AuthModule,
		TokenModule,
		UserModule,
		MailModule,
		ProductModule,
		ReviewModule,
		ShoppingCartModule,
		FavoritesModule,
		RevisedModule,
		CategoryModule,
		СharacteristicModule,
		TagModule,
		OrderModule
	]
})
export class AppModule {}
