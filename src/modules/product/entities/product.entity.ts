import { Category } from 'src/modules/category/schemes/category.scheme'
import { Order } from 'src/modules/order/schemes/order.scheme'
import { Review } from 'src/modules/review/schemes/review.scheme'
import { Tag } from 'src/modules/tag/schemes/tag.scheme'
import { User } from 'src/modules/user/schemes/user.scheme'
import { CharacteristicValue } from 'src/modules/сharacteristic/schemes/сharacteristic-value.scheme'

import { ProductImage } from '../schemes/product-image.scheme'
import { Product } from '../schemes/product.scheme'

export class ProductEntity {
	constructor(
		private id: number,
		private sku: string,
		private name: string,
		private description: string,
		private price: number,
		private availability: number,
		private parentProduct: Product | null = null,
		private variations: Product[] = [],
		private rating: number = 0,
		private images: ProductImage[] = [],
		private favorites: User[] = [],
		private revised: User[] = [],
		private reviews: Review[] = [],
		private shoppingCart: User[] = [],
		private category: Category | null = null,
		private characteristics: CharacteristicValue[] = [],
		private tags: Tag[] = [],
		private orders: Order[] = []
	) {}

    
}
