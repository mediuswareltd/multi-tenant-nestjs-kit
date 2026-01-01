import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiResponse } from '../dto';

@Injectable()
export class TransformInterceptor<T>
	implements NestInterceptor<T, BaseApiResponse<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<BaseApiResponse<T>> {
		return next.handle().pipe(
			map((data) => {
				// If the response is already wrapped, return it as is
				if (data && data.success !== undefined) {
					return data;
				}

				// Otherwise, wrap it in a success response
				return BaseApiResponse.success(
					'Operation completed successfully',
					data,
				);
			}),
		);
	}
}

