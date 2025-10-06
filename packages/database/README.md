# Database Package

This package provides database connectivity and schema management using Neon and Drizzle ORM.

## Features

- 🚀 Neon serverless database connection
- 📊 Drizzle ORM integration
- 🔄 Migration management
- 🛡️ Type-safe database operations
- 🔍 Database health checks

## Installation

```bash
pnpm install @repo/database
```

## Usage

### Basic Connection

```typescript
import { db, checkDatabaseConnection } from '@repo/database'

// Check database connection
const isConnected = await checkDatabaseConnection()
if (!isConnected) {
  throw new Error('Database connection failed')
}

// Use database
const result = await db.select().from(yourTable)
```

### Environment Variables

Create a `.env` file in your project root:

```env
DATABASE_URL=postgresql://username:password@hostname:port/database
```

## Scripts

- `pnpm db:generate` - Generate migration files
- `pnpm db:migrate` - Run migrations
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm db:push` - Push schema changes
- `pnpm db:drop` - Drop database

## Development

```bash
# Build the package
pnpm build

# Watch mode
pnpm dev
```
