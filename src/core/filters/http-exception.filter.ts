import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseApiResponse } from '../dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		let status = HttpStatus.INTERNAL_SERVER_ERROR;
		let message = 'Internal server error';
		let error: string | undefined;

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const exceptionResponse = exception.getResponse();

			if (typeof exceptionResponse === 'string') {
				message = exceptionResponse;
			} else if (typeof exceptionResponse === 'object') {
				const responseObj = exceptionResponse as any;
				message = responseObj.message || exception.message;
				error = Array.isArray(responseObj.message)
					? responseObj.message.join(', ')
					: responseObj.error || exception.name;
			}
		} else if (exception instanceof Error) {
			message = exception.message;
			error = exception.name;
		}

		const errorResponse = BaseApiResponse.error(message, error);

		response.status(status).json(errorResponse);
	}
}

