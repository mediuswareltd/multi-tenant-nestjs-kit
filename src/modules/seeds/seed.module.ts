import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { PlatformDatabaseConfigService } from '../../config/database.platform';
import { TenantDatabaseConfigService } from '../../config/database.tenant';
import config, { ConfigurationService } from '../../config/config';
import { SeedDataService } from './seed.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
		}),
		CqrsModule,
		TypeOrmModule.forRootAsync({
			name: 'platform',
			useClass: PlatformDatabaseConfigService,
		}),
		TypeOrmModule.forRootAsync({
			name: 'tenant',
			useClass: TenantDatabaseConfigService,
		}),
	],
	controllers: [],
	providers: [
		ConfigurationService,
		PlatformDatabaseConfigService,
		TenantDatabaseConfigService,
		SeedDataService,
	],
})
export class SeedAppModule {}
