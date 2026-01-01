import { Column, Entity, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Base } from '../../shared/entities';

export enum TenantStatus {
	ACTIVE = 'active',
	SUSPENDED = 'suspended',
	CANCELLED = 'cancelled',
}

@Entity('tenants')
export class Tenant extends Base {
	@ApiProperty({ type: () => String })
	@Index()
	@Column({ type: 'varchar', length: 255, nullable: false })
	name: string;

	@ApiProperty({ type: () => String })
	@Index({ unique: true })
	@Column({ type: 'varchar', length: 100, nullable: false, unique: true })
	slug: string;

	@ApiProperty({
		type: () => String,
		description:
			'Platform domain: tenant.mediusware.com | app.mediusware.com',
	})
	@Index({ unique: true })
	@Column({ type: 'varchar', length: 100, nullable: false, unique: true })
	domain: string;

	@ApiProperty({
		type: () => String,
		description: 'PostgreSQL schema name for this tenant',
	})
	@Index({ unique: true })
	@Column({
		type: 'varchar',
		length: 100,
		nullable: false,
		unique: true,
		name: 'schema_name',
	})
	schemaName: string;

	@ApiProperty({
		enum: TenantStatus,
		default: TenantStatus.ACTIVE,
	})
	@Index()
	@Column({
		type: 'varchar',
		length: 50,
		nullable: false,
		default: TenantStatus.ACTIVE,
	})
	status: TenantStatus;

	@ApiPropertyOptional({ type: () => Object })
	@Column({ type: 'jsonb', default: {} })
	metadata: Record<string, any>;

	@ApiPropertyOptional({ type: () => Date })
	@Column({ type: 'timestamptz', nullable: true, name: 'deleted_at' })
	deletedAt?: Date;
}
