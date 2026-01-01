import { SetMetadata } from '@nestjs/common';
import { PlatformRole, TenantRole } from '../enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: (PlatformRole | TenantRole)[]) =>
	SetMetadata(ROLES_KEY, roles);
