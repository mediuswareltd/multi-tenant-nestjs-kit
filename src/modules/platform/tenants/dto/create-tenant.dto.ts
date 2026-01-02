import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsString,
	IsNotEmpty,
	MaxLength,
	Matches,
	IsOptional,
	IsObject,
} from 'class-validator';

export class CreateTenantDto {
	@ApiProperty({ example: 'Acme Corporation' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	name: string;

	@ApiProperty({
		example: 'acme-corp',
		description: 'URL-friendly slug (lowercase, hyphens)',
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	@Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
		message: 'Slug must be lowercase with hyphens only',
	})
	slug: string;

	@ApiProperty({
		example: 'acme.mediusware.com',
		description: 'Tenant domain',
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	domain: string;

	@ApiPropertyOptional({
		example: { companySize: 'medium', industry: 'technology' },
	})
	@IsOptional()
	@IsObject()
	metadata?: Record<string, any>;
}
