import { Repository } from 'typeorm';
import { TenantBaseEntity } from '../../modules/platform/shared/entities';

export abstract class TenantAwareCrudService<T extends TenantBaseEntity> {
	protected constructor(protected readonly repository: Repository<T>) {}
}
