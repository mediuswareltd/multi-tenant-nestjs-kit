import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
	type: 'postgres',
	host: configService.get('DB_PLATFORM_HOST', 'localhost'),
	port: parseInt(configService.get('DB_PLATFORM_PORT', '5432')),
	username: configService.get('DB_PLATFORM_USER', 'postgres'),
	password: configService.get('DB_PLATFORM_PASS', 'password'),
	database: configService.get('DB_PLATFORM_NAME', 'platform'),
	entities: [
		'src/modules/platform/**/entities/*.entity.ts',
		'src/modules/platform/shared/entities/*.entity.ts',
	],
	migrations: ['src/migrations/platform/*.ts'],
	synchronize: false,
	logging: configService.get('DB_LOGGING') === 'true',
});
