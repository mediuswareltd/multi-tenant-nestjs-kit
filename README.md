## MW NestJS Kit

Multi-Tenant-NestJS-Kit is a boilerplate with multi-tenant support, ready for foundational implementation.

## Quick Start

### With Docker

```bash
cp env.example .env
docker-compose up -d
yarn migration:run
yarn start
```

### Local Setup

1. Install dependencies

```bash
yarn install
```

2. Create PostgreSQL databases

```sql
CREATE DATABASE platform;
CREATE DATABASE tenant;
```

3. Configure environment

```bash
cp env.example .env
```

4. Run migrations (both databases)

```bash
# Run both databases
yarn migration:run

# Or separately
yarn migration:run:platform
yarn migration:run:tenant
```

5. Start server

```bash
yarn start:dev
```

Browse http://localhost:5000

## Available Scripts

- `yarn start:dev` - Development with hot reload
- `yarn build` - Production build
- `yarn migration:run` - Run migrations
- `yarn seed` - Seed database
- `yarn test` - Run tests
- `yarn lint` - Lint code

## Tech Stack

- NestJS 11.x
- PostgreSQL 15 + TypeORM
- Redis 7.x
- JWT Auth
- Docker

## Structure

```
src/
├── config/              # Configuration (database, env)
├── core/                # Core utilities (no entities!)
│   ├── enums/          # Enums (Roles, Auth, Subscription)
│   ├── decorators/     # Custom decorators (@Roles, @CurrentTenant)
│   ├── guards/         # Guards (RolesGuard)
│   ├── interfaces/     # TypeScript interfaces
│   └── crud/           # Tenant-aware CRUD service
├── modules/
│   ├── platform/       # Platform-level modules
│   │   ├── auth/      # Authentication
│   │   │   └── entities/  # TenantApiKey
│   │   └── tenants/   # Tenant management
│   │       └── entities/  # Tenant
│   ├── tenant/         # Tenant-scoped modules
│   │                  # (documents, dashboard, etc.)
│   └── seeds/         # Database seeders
├── main.ts             # Entry point
└── app.module.ts       # Root module
```

## Commands

### Module Generation (Platform/Tenant)

To generate a new module within the `platform` context, use the NestJS CLI:

```bash
nest generate resource modules/platform/foobar
```

## Core Features

- **Dual Database Architecture**
    - Platform DB: Master data (tenants, users, billing)
    - Tenant DB: Schema-per-tenant (documents, dashboards)
- Multi-tenant foundation (row-level isolation)
- Role-based access control structure
- Tenant context propagation ready
- JWT authentication (ready to implement)
- User management (ready to implement)
- Subscription system (enums ready)

## Database Architecture

**Platform Database**

- Single database for all platform operations
- Stores: Tenants, Users, Subscriptions, Plans, Billing, Audit Logs
- No tenant isolation needed (separate concerns)

**Tenant Database (Schema-per-Tenant)**

- One database, multiple schemas (one per tenant)
- Schema: `tenant_abc`, `tenant_xyz`, etc.
- Stores: Documents, Dashboards, Settings, Reports
- Complete data isolation per tenant

## Module Organization

**Platform Modules** (`modules/platform/`) → Platform DB

- System-wide functionality
- Tenants, users, subscriptions, billing, audit

**Tenant Modules** (`modules/tenant/`) → Tenant DB (schema-per-tenant)

- Tenant-scoped business logic
- Documents, dashboards, settings, reports
