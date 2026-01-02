// Platform-level roles (no tenant context)
export enum PlatformRole {
	SuperAdmin = 'SuperAdmin',
	SupportEngineer = 'SupportEngineer',
	ExternalOperator = 'ExternalOperator',
}

// Tenant-level roles (scoped to tenant)
export enum TenantRole {
	TenantAdmin = 'TenantAdmin',
	Manager = 'Manager',
	User = 'User',
	ReadOnly = 'ReadOnly',
	APIClient = 'APIClient',
}
