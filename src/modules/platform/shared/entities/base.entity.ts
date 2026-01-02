import {
	UpdateDateColumn,
	CreateDateColumn,
	Column,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export abstract class Base {
	@ApiPropertyOptional({ type: () => String })
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ApiProperty({
		type: 'string',
		format: 'date-time',
		example: '2022-11-21T06:22:34.234Z',
	})
	@CreateDateColumn()
	createdAt?: Date;

	@ApiProperty({
		type: 'string',
		format: 'date-time',
		example: '2022-11-21T06:22:34.234Z',
	})
	@UpdateDateColumn()
	updatedAt?: Date;

	@ApiPropertyOptional({ type: Boolean, default: true })
	@Column({ nullable: false, default: true })
	isActive: boolean;

	@ApiPropertyOptional({ type: Boolean, default: false })
	@Column({ nullable: false, default: false })
	isArchived: boolean;
}
