# DigiDocs - Digital Document Services Platform

A modern, full-stack web application for digital document services built with Next.js 15 and Turborepo.

## 🏗️ Project Structure

This is a monorepo managed by Turborepo with the following packages:

```
digidocs/
├── apps/
│   └── web/                 # Next.js 15 web application
├── packages/
│   ├── database/            # Drizzle ORM + Neon PostgreSQL
│   ├── ui/                  # Shared UI components (shadcn/ui)
│   ├── eslint-config/       # Shared ESLint configurations
│   └── typescript-config/   # Shared TypeScript configurations
```

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Monorepo**: [Turborepo](https://turbo.build/)
- **Database**: [Neon PostgreSQL](https://neon.tech/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📋 Prerequisites

- Node.js 18 or higher
- pnpm 9.15.1 or higher
- PostgreSQL database (Neon recommended)
- Google OAuth credentials (optional, for social login)

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd digidocs
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# Authentication
BETTER_AUTH_SECRET=your-super-secret-key-here-min-32-chars
BETTER_AUTH_URL=http://localhost:3001
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3001

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

See `apps/web/.env.template` for a complete template.

### 4. Set up the database

```bash
# Generate database schema
pnpm --filter @repo/database db:generate

# Push schema to database
pnpm --filter @repo/database db:push
```

### 5. Start development server

```bash
pnpm dev
```

The application will be available at `http://localhost:3001`.

## 📦 Available Scripts

### Root Level

- `pnpm dev` - Start all packages in development mode
- `pnpm build` - Build all packages for production
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier

### Web App (`apps/web`)

- `pnpm --filter web dev` - Start Next.js development server
- `pnpm --filter web build` - Build for production
- `pnpm --filter web start` - Start production server
- `pnpm --filter web lint` - Lint the web app

### Database (`packages/database`)

- `pnpm --filter @repo/database db:generate` - Generate migrations
- `pnpm --filter @repo/database db:push` - Push schema to database
- `pnpm --filter @repo/database db:studio` - Open Drizzle Studio
- `pnpm --filter @repo/database build` - Build the package

## 🚢 Deployment

### Vercel

The project is configured for Vercel deployment:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

## 🏃 Development Workflow

### Working with the Database

```bash
# Make changes to schema in packages/database/src/schema/

# Generate migration
pnpm --filter @repo/database db:generate

# Apply to database
pnpm --filter @repo/database db:push

# View database in browser
pnpm --filter @repo/database db:studio
```

### Adding UI Components

```bash
# From the ui package directory
cd packages/ui
npx shadcn@latest add <component-name>
```

### Adding Dependencies

```bash
# Add to specific package
pnpm --filter web add <package-name>

# Add to workspace root
pnpm add -w <package-name>
```

## 🔒 Authentication

The app uses Better Auth with support for:

- ✅ Email/Password authentication
- ✅ Google OAuth
- ✅ Session management
- ✅ CSRF protection
- ✅ Cookie-based sessions

### Setting up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins and redirect URIs
6. Copy client ID and secret to `.env.local`

## 📁 Project Architecture

### Apps

- **web**: Main Next.js application with:
  - App Router structure
  - Authentication flows
  - Service pages
  - Checkout system
  - Responsive UI

### Packages

- **database**: Centralized database layer with:
  - Drizzle ORM configuration
  - Type-safe schema definitions
  - Migration management
  
- **ui**: Reusable UI components with:
  - shadcn/ui components
  - Custom styled components
  - Tailwind configuration

- **eslint-config**: Shared ESLint rules
- **typescript-config**: Shared TypeScript configurations

## 🎨 Features

- 🔐 **Authentication**: Email/password and Google OAuth
- 📄 **Document Services**: Browse and order document services
- 🛒 **Checkout Flow**: Complete order processing system
- 💳 **Guest Checkout**: Allow orders without sign-up
- 📱 **Responsive Design**: Mobile-first approach
- ⚡ **Performance**: Optimized with Next.js 15 features
- 🌐 **SEO**: Built-in sitemap and robots.txt
- 🎭 **Animations**: Smooth GSAP animations
- 🔒 **Security**: CSRF protection, secure cookies, input validation

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📝 Environment Variables

Required environment variables:

```bash
# Database
DATABASE_URL                    # Neon PostgreSQL connection string

# Authentication
BETTER_AUTH_SECRET             # Random 32+ character string
BETTER_AUTH_URL                # Your app URL
NEXT_PUBLIC_BETTER_AUTH_URL    # Public app URL

# OAuth (Optional)
GOOGLE_CLIENT_ID               # Google OAuth client ID
GOOGLE_CLIENT_SECRET           # Google OAuth client secret
```

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure `DATABASE_URL` is correctly formatted
- Check Neon project is active
- Verify SSL mode is included: `?sslmode=require`

### Build Errors

- Clear cache: `pnpm turbo clean`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`
- Check Node version: `node --version` (should be 18+)

### Authentication Issues

- Verify `BETTER_AUTH_SECRET` is set
- Check OAuth redirect URIs match your domain
- Clear browser cookies and try again

## 📚 Documentation

- [Database Schema Docs](./packages/database/SCHEMA_DOCS.md)
- [Service Details Implementation](./apps/web/SERVICE_DETAILS_IMPLEMENTATION.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Turborepo](https://turbo.build/)
- [Neon](https://neon.tech/)
- [Better Auth](https://www.better-auth.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

Built with ❤️ using modern web technologies

