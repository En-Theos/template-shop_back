import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

export function getMySQLConfig(): TypeOrmModuleAsyncOptions {
    return {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.getOrThrow<string>('MYSQL_HOST'),
            port: +configService.getOrThrow<number>('MYSQL_PORT'),
            username: configService.getOrThrow<string>('MYSQL_USERNAME'),
            password: configService.getOrThrow<string>('MYSQL_ROOT_PASSWORD'),
            database: configService.getOrThrow<string>('MYSQL_DATABASE'),
            autoLoadEntities: true,
            synchronize: true,
        }),
    }
}