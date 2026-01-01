import { Request } from 'express';
import { AuthMethod } from '../enums/auth-method.enum';
import { ITenant } from './tenant.interface';

export interface CustomRequest extends Request {
	authMethod?: AuthMethod;
	tenant?: ITenant;
	user?: any; // Will be properly typed when User entity is created
	impersonation?: {
		originalUserId: string;
		reason: string;
		startedAt: Date;
	};
}
