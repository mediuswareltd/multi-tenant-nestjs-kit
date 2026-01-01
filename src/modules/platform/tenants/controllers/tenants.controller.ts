import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TenantsService } from '../services/tenants.service';
import { CreateTenantDto, UpdateTenantDto } from '../dto';
import { Tenant } from '../entities';
import { BaseApiResponse } from '../../../../core/dto';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
	constructor(private readonly tenantsService: TenantsService) {}

	@Post()
	@ApiOperation({ summary: 'Create a new tenant' })
	@ApiResponse({
		status: 201,
		description: 'Tenant created successfully',
	})
	@ApiResponse({ status: 409, description: 'Slug or domain already exists' })
	async create(
		@Body() createTenantDto: CreateTenantDto,
	): Promise<BaseApiResponse<Tenant>> {
		const tenant = await this.tenantsService.create(createTenantDto);
		return BaseApiResponse.success('Tenant created successfully', tenant);
	}

	@Get()
	@ApiOperation({ summary: 'Get all active tenants' })
	@ApiResponse({
		status: 200,
		description: 'List of tenants retrieved successfully',
	})
	async findAll(): Promise<BaseApiResponse<Tenant[]>> {
		const tenants = await this.tenantsService.findAll();
		return BaseApiResponse.success(
			'Tenants retrieved successfully',
			tenants,
		);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get tenant by ID' })
	@ApiResponse({ status: 200, description: 'Tenant found' })
	@ApiResponse({ status: 404, description: 'Tenant not found' })
	async findOne(@Param('id') id: string): Promise<BaseApiResponse<Tenant>> {
		const tenant = await this.tenantsService.findOne(id);
		return BaseApiResponse.success('Tenant retrieved successfully', tenant);
	}

	@Get('slug/:slug')
	@ApiOperation({ summary: 'Get tenant by slug' })
	@ApiResponse({ status: 200, description: 'Tenant found' })
	@ApiResponse({ status: 404, description: 'Tenant not found' })
	async findBySlug(
		@Param('slug') slug: string,
	): Promise<BaseApiResponse<Tenant>> {
		const tenant = await this.tenantsService.findBySlug(slug);
		return BaseApiResponse.success('Tenant retrieved successfully', tenant);
	}

	@Get('domain/:domain')
	@ApiOperation({ summary: 'Get tenant by domain' })
	@ApiResponse({ status: 200, description: 'Tenant found' })
	@ApiResponse({ status: 404, description: 'Tenant not found' })
	async findByDomain(
		@Param('domain') domain: string,
	): Promise<BaseApiResponse<Tenant>> {
		const tenant = await this.tenantsService.findByDomain(domain);
		return BaseApiResponse.success('Tenant retrieved successfully', tenant);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update tenant' })
	@ApiResponse({
		status: 200,
		description: 'Tenant updated successfully',
	})
	@ApiResponse({ status: 404, description: 'Tenant not found' })
	async update(
		@Param('id') id: string,
		@Body() updateTenantDto: UpdateTenantDto,
	): Promise<BaseApiResponse<Tenant>> {
		const tenant = await this.tenantsService.update(id, updateTenantDto);
		return BaseApiResponse.success('Tenant updated successfully', tenant);
	}

	@Patch(':id/suspend')
	@ApiOperation({ summary: 'Suspend tenant' })
	@ApiResponse({
		status: 200,
		description: 'Tenant suspended successfully',
	})
	async suspend(@Param('id') id: string): Promise<BaseApiResponse<Tenant>> {
		const tenant = await this.tenantsService.suspend(id);
		return BaseApiResponse.success('Tenant suspended successfully', tenant);
	}

	@Patch(':id/activate')
	@ApiOperation({ summary: 'Activate tenant' })
	@ApiResponse({
		status: 200,
		description: 'Tenant activated successfully',
	})
	async activate(@Param('id') id: string): Promise<BaseApiResponse<Tenant>> {
		const tenant = await this.tenantsService.activate(id);
		return BaseApiResponse.success('Tenant activated successfully', tenant);
	}

	@Patch(':id/cancel')
	@ApiOperation({ summary: 'Cancel tenant' })
	@ApiResponse({
		status: 200,
		description: 'Tenant cancelled successfully',
	})
	async cancel(@Param('id') id: string): Promise<BaseApiResponse<Tenant>> {
		const tenant = await this.tenantsService.cancel(id);
		return BaseApiResponse.success('Tenant cancelled successfully', tenant);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Soft delete tenant' })
	@ApiResponse({ status: 200, description: 'Tenant deleted successfully' })
	@ApiResponse({ status: 404, description: 'Tenant not found' })
	async remove(
		@Param('id') id: string,
	): Promise<BaseApiResponse<{ message: string }>> {
		await this.tenantsService.remove(id);
		return BaseApiResponse.success('Tenant deleted successfully', {
			message: 'Tenant has been soft deleted',
		});
	}
}
