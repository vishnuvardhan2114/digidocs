# Project Setup

This project is a monorepo that includes a database package using Neon and Drizzle ORM.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn
- [PostgreSQL](https://www.postgresql.org/) database (Neon or local)

## Getting Started

1. **Clone the repository**

   ```sh
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. **Install dependencies**

   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root and fill in the required variables:

   ```
   NODE_ENV=development
   DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
   BETTER_AUTH_SECRET=your-secret
   BETTER_AUTH_URL=your-auth-url
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXT_PUBLIC_BETTER_AUTH_URL=your-public-auth-url
   ```

4. **Build the packages**

   ```sh
   pnpm build
   # or
   npm run build
   # or
   yarn build
   ```

5. **Database Migrations**

   Navigate to the database package and run migrations:

   ```sh
   cd packages/database
   pnpm db:migrate
   # or
   npm run db:migrate
   # or
   yarn db:migrate
   ```

6. **Development**

   To start development mode (for example, in the web app):

   ```sh
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

## Useful Scripts

From the `packages/database` directory:

- `db:generate` — Generate Drizzle ORM types and schema
- `db:migrate` — Run database migrations
- `db:studio` — Open Drizzle Studio for DB inspection
- `db:push` — Push schema changes to the database
- `db:drop` — Drop the database

## Notes

- Environment variables are managed via `.env` files and are required for builds and local development.
- See `turbo.json` for task orchestration and caching details.
- See `.gitignore` for ignored files and folders.
