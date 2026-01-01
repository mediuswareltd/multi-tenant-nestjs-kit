import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant, TenantStatus } from '../entities';
import { CreateTenantDto, UpdateTenantDto } from '../dto';

@Injectable()
export class TenantsService {
	constructor(
		@InjectRepository(Tenant, 'platform')
		private readonly tenantRepository: Repository<Tenant>,
	) {}

	async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
		// Check if slug already exists
		const existingSlug = await this.tenantRepository.findOne({
			where: { slug: createTenantDto.slug },
		});
		if (existingSlug) {
			throw new ConflictException('Tenant slug already exists');
		}

		// Check if domain already exists
		const existingDomain = await this.tenantRepository.findOne({
			where: { domain: createTenantDto.domain },
		});
		if (existingDomain) {
			throw new ConflictException('Domain already exists');
		}

		// Generate schema name from slug
		const schemaName = `tenant_${createTenantDto.slug}`;

		const tenant = this.tenantRepository.create({
			...createTenantDto,
			schemaName,
			status: TenantStatus.ACTIVE,
		});

		return await this.tenantRepository.save(tenant);
	}

	async findAll(): Promise<Tenant[]> {
		return await this.tenantRepository.find({
			where: { isActive: true },
			order: { createdAt: 'DESC' },
		});
	}

	async findOne(id: string): Promise<Tenant> {
		const tenant = await this.tenantRepository.findOne({
			where: { id, isActive: true },
		});

		if (!tenant) {
			throw new NotFoundException('Tenant not found');
		}

		return tenant;
	}

	async findBySlug(slug: string): Promise<Tenant> {
		const tenant = await this.tenantRepository.findOne({
			where: { slug, isActive: true },
		});

		if (!tenant) {
			throw new NotFoundException('Tenant not found');
		}

		return tenant;
	}

	async findByDomain(domain: string): Promise<Tenant> {
		const tenant = await this.tenantRepository.findOne({
			where: { domain, isActive: true },
		});

		if (!tenant) {
			throw new NotFoundException('Tenant not found');
		}

		return tenant;
	}

	async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
		const tenant = await this.findOne(id);

		Object.assign(tenant, updateTenantDto);

		return await this.tenantRepository.save(tenant);
	}

	async suspend(id: string): Promise<Tenant> {
		const tenant = await this.findOne(id);
		tenant.status = TenantStatus.SUSPENDED;
		return await this.tenantRepository.save(tenant);
	}

	async activate(id: string): Promise<Tenant> {
		const tenant = await this.findOne(id);
		tenant.status = TenantStatus.ACTIVE;
		return await this.tenantRepository.save(tenant);
	}

	async cancel(id: string): Promise<Tenant> {
		const tenant = await this.findOne(id);
		tenant.status = TenantStatus.CANCELLED;
		tenant.deletedAt = new Date();
		return await this.tenantRepository.save(tenant);
	}

	async remove(id: string): Promise<void> {
		const tenant = await this.findOne(id);
		tenant.isActive = false;
		tenant.isArchived = true;
		tenant.deletedAt = new Date();
		await this.tenantRepository.save(tenant);
	}
}

