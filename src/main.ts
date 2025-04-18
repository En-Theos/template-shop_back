import fastifyCookie from '@fastify/cookie'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import { AppModule } from './modules/app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

	await app.register(fastifyCookie)

	const config = app.get(ConfigService)

	app.useGlobalPipes(new ValidationPipe({ transform: true }))
	app.enableCors({
		credentials: true,
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
	})

	await app.listen(config.getOrThrow('SERVER_PORT'))
}
bootstrap()
