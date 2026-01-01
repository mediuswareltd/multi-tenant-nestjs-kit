import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';

/**
 * Auth Guard
 *
 * TODO: Implement JWT authentication guard
 * - Verify user is authenticated
 * - Check user permissions
 * - Validate tenant context
 */
@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const IS_DISABLE_AUTH = process.env.IS_DISABLE_AUTH === 'true';

		if (!IS_DISABLE_AUTH) {
			const request = context.switchToHttp().getRequest();

			// TODO: Implement JWT verification
			if (!request.user) {
				throw new UnauthorizedException('Authentication required');
			}

			return !!request.user;
		}

		return true;
	}
}
