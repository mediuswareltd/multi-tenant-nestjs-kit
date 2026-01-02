import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

/**
 * Tenant Database Configuration
 *
 * This database uses schema-per-tenant approach:
 * - Each tenant gets its own schema (e.g., tenant_abc, tenant_xyz)
 * - Contains tenant-specific business data:
 *   - Documents
 *   - Dashboards
 *   - Settings
 *   - Reports
 *
 * Schema switching happens at runtime based on tenant context
 */
@Injectable()
export class TenantDatabaseConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			name: 'tenant',
			type: 'postgres',
			host: this.configService.get('DB_TENANT_HOST', 'localhost'),
			port: this.configService.get('DB_TENANT_PORT', 5432),
			username: this.configService.get('DB_TENANT_USER', 'postgres'),
			password: this.configService.get('DB_TENANT_PASS', 'password'),
			database: this.configService.get('DB_TENANT_NAME', 'tenant'),
			entities: ['dist/modules/tenant/**/entities/*.entity.js'],
			synchronize: this.configService.get('DB_SYNCHRONIZE') === 'true',
			logging: this.configService.get('DB_LOGGING') === 'true',
			// Schema will be set dynamically per request based on tenant context
		};
	}
}
