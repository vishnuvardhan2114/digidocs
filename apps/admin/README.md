# Admin Dashboard

A Next.js 15 admin dashboard application with Zustand state management and Better Auth authentication.

## Features

- **Next.js 15** with App Router
- **Zustand** state management with persistence
- **Better Auth** with username/password authentication
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **Monorepo integration** with shared packages

## Zustand Stores

### Auth Store (`lib/store/auth.ts`)
- Manages user authentication state
- Persisted to localStorage
- Syncs with Better Auth

### Theme Store (`lib/store/theme.ts`)
- Manages theme preferences (light/dark/system)
- Persisted to localStorage
- Applies theme to document

### Counter Store (`lib/store/counter.ts`)
- Simple counter demonstration
- No persistence (basic store example)

## Environment Variables

Create a `.env.local` file in the `apps/admin` directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/digidocs"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-secret-key-here-change-in-production"
BETTER_AUTH_URL="http://localhost:3002"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3002"

# Environment
NODE_ENV="development"
```

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables (see above)

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3002](http://localhost:3002) in your browser

## Available Scripts

- `pnpm dev` - Start development server on port 3002
- `pnpm build` - Build the application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Structure

```
apps/admin/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth pages (sign-in, sign-up)
│   ├── api/               # API routes
│   ├── providers/         # React providers
│   └── layout.tsx         # Root layout
├── lib/                   # Utility functions
│   ├── auth/              # Better Auth configuration
│   └── store/             # Zustand stores
├── components/            # React components
└── public/               # Static assets
```

## Authentication

The admin app uses Better Auth with username/password authentication only. Users can:

- Sign up with email, password, and name
- Sign in with email and password
- Sign out from the dashboard

## State Management

All Zustand stores are available through the `lib/store/index.ts` barrel export:

```typescript
import { useAuthStore, useThemeStore, useCounterStore } from '@/lib/store';
```

## Integration with Monorepo

The admin app integrates with the existing monorepo packages:

- `@repo/ui` - Shared UI components
- `@repo/database` - Database schema and connection
- `@repo/typescript-config` - TypeScript configuration
- `@repo/eslint-config` - ESLint configuration
