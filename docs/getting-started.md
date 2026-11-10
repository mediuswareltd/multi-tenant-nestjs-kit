# Getting started

Run **Multi-Tenant NestJS Kit** on your machine.

## 1. Quick start

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

## Next

- Full detail: [Guide](/guide)
- Source: [github.com/mediuswareltd/multi-tenant-nestjs-kit](https://github.com/mediuswareltd/multi-tenant-nestjs-kit)
