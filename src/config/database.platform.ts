import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

/**
 * Platform Database Configuration
 *
 * This database stores platform-level data:
 * - Tenants
 * - Users (platform & tenant users)
 * - Subscriptions & Plans
 * - Billing & Usage
 * - Audit Logs
 * - API Keys
 */
@Injectable()
export class PlatformDatabaseConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			name: 'platform',
			type: 'postgres',
			host: this.configService.get('DB_PLATFORM_HOST', 'localhost'),
			port: this.configService.get('DB_PLATFORM_PORT', 5432),
			username: this.configService.get('DB_PLATFORM_USER', 'postgres'),
			password: this.configService.get('DB_PLATFORM_PASS', 'password'),
			database: this.configService.get('DB_PLATFORM_NAME', 'platform'),
			entities: ['dist/modules/platform/**/entities/*.entity.js'],
			synchronize: this.configService.get('DB_SYNCHRONIZE') === 'true',
			logging: this.configService.get('DB_LOGGING') === 'true',
		};
	}
}
