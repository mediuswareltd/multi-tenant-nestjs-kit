import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities';
import { TenantsService } from './services/tenants.service';
import { TenantsController } from './controllers/tenants.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Tenant], 'platform')],
	controllers: [TenantsController],
	providers: [TenantsService],
	exports: [TenantsService],
})
export class TenantsModule {}
