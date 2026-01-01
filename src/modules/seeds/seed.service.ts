import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

/**
 * Seed Service for initializing database with default data
 *
 * TODO: Implement seed data for:
 * - Platform DB: Initial tenant, admin user, default plans
 * - Tenant DB: Demo schemas with sample data
 */
@Injectable()
export class SeedDataService {
	constructor(
		@InjectDataSource('platform')
		private readonly platformDataSource: DataSource,
		@InjectDataSource('tenant')
		private readonly tenantDataSource: DataSource,
	) {}

	public async executeSeed(): Promise<void> {
		try {
			console.log('Starting database seed...');

			await this.seedPlatformData();
			await this.seedTenantData();

			console.log('✅ Seed completed successfully');
		} catch (error) {
			console.error('❌ Seed failed:', error);
			throw error;
		}
	}

	private async seedPlatformData(): Promise<void> {
		console.log('Seeding platform database...');

		// TODO: Add platform seed data
		// - Default tenant
		// - Admin user
		// - Default plans (Free, Bronze, Silver, Gold)
		// - API keys

		console.log('Platform seed completed');
	}

	private async seedTenantData(): Promise<void> {
		console.log('Seeding tenant database...');

		// TODO: Add tenant seed data
		// - Create demo tenant schemas
		// - Add sample documents
		// - Add sample dashboards

		console.log('Tenant seed completed');
	}
}
