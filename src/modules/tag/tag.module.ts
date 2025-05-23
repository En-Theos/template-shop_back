import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Tag } from './schemes/tag.scheme'
import { TagController } from './tag.controller'
import { TagService } from './tag.service'

@Module({
	imports: [TypeOrmModule.forFeature([Tag])],
	controllers: [TagController],
	providers: [TagService]
})
export class TagModule {}
