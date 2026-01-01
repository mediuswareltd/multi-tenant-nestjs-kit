import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CustomRequest } from '../../../core/interfaces';

/**
 * Auth Middleware
 * 
 * TODO: Implement JWT authentication
 * - Verify JWT token from Authorization header
 * - Extract user and tenant from token
 * - Attach to request context
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
	async use(
		req: CustomRequest,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const IS_DISABLE_AUTH = process.env.IS_DISABLE_AUTH === 'true';

		if (!IS_DISABLE_AUTH) {
			// TODO: Implement JWT verification
			// const token = req.header('Authorization')?.replace('Bearer ', '');
			// const decoded = await verifyJWT(token);
			// req.user = decoded.user;
			// req.tenant = decoded.tenant;
		}

		next();
	}
}
