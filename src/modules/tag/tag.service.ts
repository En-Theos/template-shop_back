import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IdParamDto } from 'src/dtos/IdParam.dto'
import { In, Repository } from 'typeorm'

import { CreateTagDto } from './dtos/CreateTag.dto'
import { DeleteTagsDto } from './dtos/DeleteTags.dto'
import { UpdateTagDto } from './dtos/UpdateTag.dto'
import { Tag } from './schemes/tag.scheme'

@Injectable()
export class TagService {
	constructor(
		@InjectRepository(Tag)
		private readonly tagsRepository: Repository<Tag>
	) {}

	async getTags() {
		const tags = await this.tagsRepository.find({
			select: ['id', 'type', 'label'],
			order: { type: 'ASC', label: 'ASC' }
		})

		const grouped = tags.reduce(
			(acc, tag) => {
				if (!acc[tag.type]) {
					acc[tag.type] = []
				}
				acc[tag.type].push({ id: tag.id, label: tag.label })
				return acc
			},
			{} as Record<string, { id: number; label: string }[]>
		)

		return Object.entries(grouped).map(([type, labels]) => ({ type, labels }))
	}

	async createTag(dto: CreateTagDto) {
		const exsistTag = await this.tagsRepository.findOne({
			where: { label: dto.label, type: dto.type }
		})
		if (exsistTag) throw new ConflictException('Такий тег уже існує')

		const newTag = this.tagsRepository.create(dto)

		const createdTag = await this.tagsRepository.save(newTag)

		return await this.tagsRepository.findOne({
			where: { id: createdTag.id }
		})
	}

	async updateTag(dto: IdParamDto & UpdateTagDto) {
		const exsistTag = await this.tagsRepository.findOne({
			where: { id: dto.id }
		})
		if (!exsistTag) throw new NotFoundException('Тег не знайдено')

		const duplicateTag = await this.tagsRepository.findOne({
			where: { label: dto.label || exsistTag.label, type: dto.type || exsistTag.type }
		})
		if (duplicateTag) throw new ConflictException('Такий тег уже існує')

		await this.tagsRepository.save({ ...exsistTag, ...dto })

		return await this.tagsRepository.findOne({
			where: { id: dto.id }
		})
	}

	async deleteTags(query: DeleteTagsDto) {
		await this.tagsRepository.delete({ id: In(query.tagsIds) })
	}
}
