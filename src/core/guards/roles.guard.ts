import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PlatformRole, TenantRole } from '../enums';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<
			(PlatformRole | TenantRole)[]
		>(ROLES_KEY, [context.getHandler(), context.getClass()]);

		if (!requiredRoles) {
			return true;
		}

		const { user } = context.switchToHttp().getRequest();
		
		if (!user) {
			return false;
		}

		// TODO: Implement actual role checking logic when User entity is created
		// return requiredRoles.some((role) => user.roles?.includes(role));
		
		return true;
	}
}

