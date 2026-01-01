import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseApiResponse<T> {
	@ApiProperty({ example: true })
	success: boolean;

	@ApiProperty({ example: 'Operation completed successfully' })
	message: string;

	@ApiPropertyOptional()
	data?: T;

	@ApiPropertyOptional({ example: null })
	error?: string | null;

	constructor(
		success: boolean,
		message: string,
		data?: T,
		error?: string | null,
	) {
		this.success = success;
		this.message = message;
		this.data = data;
		this.error = error;
	}

	static success<T>(message: string, data?: T): BaseApiResponse<T> {
		return new BaseApiResponse(true, message, data, null);
	}

	static error<T>(message: string, error?: string): BaseApiResponse<T> {
		return new BaseApiResponse(false, message, undefined, error);
	}
}

export class PaginatedResponse<T> {
	@ApiProperty()
	items: T[];

	@ApiProperty({ example: 100 })
	total: number;

	@ApiProperty({ example: 1 })
	page: number;

	@ApiProperty({ example: 10 })
	limit: number;

	@ApiProperty({ example: 10 })
	totalPages: number;

	constructor(items: T[], total: number, page: number, limit: number) {
		this.items = items;
		this.total = total;
		this.page = page;
		this.limit = limit;
		this.totalPages = Math.ceil(total / limit);
	}
}
