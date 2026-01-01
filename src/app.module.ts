import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { PlatformDatabaseConfigService } from './config/database.platform';
import { TenantDatabaseConfigService } from './config/database.tenant';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/platform/auth/auth.module';
import { TenantsModule } from './modules/platform/tenants/tenants.module';
import { AppSagas } from './sagas/app.saga';
import config, { ConfigurationService } from './config/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
		}),
		CqrsModule,
		// Platform Database Connection
		TypeOrmModule.forRootAsync({
			name: 'platform',
			useClass: PlatformDatabaseConfigService,
		}),
		// Tenant Database Connection (schema-per-tenant)
		TypeOrmModule.forRootAsync({
			name: 'tenant',
			useClass: TenantDatabaseConfigService,
		}),
		AuthModule,
		TenantsModule,
	],
	controllers: [AppController],
	providers: [
		ConfigurationService,
		AppService,
		PlatformDatabaseConfigService,
		TenantDatabaseConfigService,
		AppSagas,
	],
})
export class AppModule {}
