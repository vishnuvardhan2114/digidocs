# Cloudflare Pages Deployment Guide for DigiDocs

This guide will help you deploy your Next.js Turborepo application to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account (free tier works)
2. Neon PostgreSQL database (already configured)
3. Google OAuth credentials (already configured)
4. Git repository pushed to GitHub/GitLab/Bitbucket

## 🔧 Configuration Steps

### 1. Install Cloudflare Next.js Adapter

The `@cloudflare/next-on-pages` package is required for deploying Next.js to Cloudflare Pages.

```bash
# From the root of your project
cd apps/web
pnpm add -D @cloudflare/next-on-pages vercel
```

### 2. Update next.config.mjs

Your current Next.js config needs slight adjustments for Cloudflare compatibility. The configuration is mostly compatible, but we should ensure proper runtime settings.

### 3. Environment Variables

Set these environment variables in Cloudflare Pages Dashboard (Settings > Environment Variables):

#### Production Variables:
```
DATABASE_URL=your_neon_database_url
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=https://your-domain.pages.dev
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-domain.pages.dev
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NODE_VERSION=18
```

#### Development/Preview Variables (optional):
You can set different values for preview deployments if needed.

### 4. Create Cloudflare-specific Configuration

A `wrangler.toml` file is optional but recommended for advanced configurations.

## 🚀 Deployment Methods

### Method 1: Automatic Deployment via Cloudflare Dashboard (Recommended)

1. **Connect Your Repository**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to `Workers & Pages` > `Create application` > `Pages` > `Connect to Git`
   - Select your repository and branch

2. **Configure Build Settings**
   ```
   Framework preset: Next.js
   Build command: cd apps/web && pnpm install && pnpm build
   Build output directory: apps/web/.next
   Root directory: /
   ```

   Or use the root-level build:
   ```
   Build command: pnpm install && pnpm turbo run build --filter=web...
   Build output directory: apps/web/.next
   Root directory: /
   ```

3. **Set Environment Variables**
   - Add all the environment variables listed above in the dashboard

4. **Deploy**
   - Click "Save and Deploy"
   - Cloudflare will automatically build and deploy your application

### Method 2: CLI Deployment using Wrangler

1. **Install Wrangler**
   ```bash
   pnpm add -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build and Deploy**
   ```bash
   # From project root
   pnpm turbo run build --filter=web...
   
   # Deploy from web directory
   cd apps/web
   npx @cloudflare/next-on-pages --experimental-minify
   wrangler pages deploy .vercel/output/static --project-name=digidocs
   ```

## 🔍 Build Configuration Details

### Recommended Build Settings for Cloudflare Pages

**Framework:** Next.js (Static)

**Build Command:**
```bash
pnpm install --frozen-lockfile && pnpm turbo run build --filter=web...
```

**Build Output Directory:**
```
apps/web/.next
```

**Install Command:**
```bash
pnpm install --frozen-lockfile
```

**Node Version:** 18 or higher

### Turborepo Build Process

Your `turbo.json` is already configured correctly. The build will:
1. Build `@repo/database` package first
2. Build `@repo/ui` package
3. Build the `web` application with all dependencies

## ⚙️ Runtime Considerations

### Edge Runtime vs Node.js Runtime

Cloudflare Pages runs on the Edge runtime by default. Some considerations:

1. **Database Connections**: Your Neon HTTP connection is perfect for Edge runtime ✅
2. **Better Auth**: Works on Edge runtime ✅
3. **API Routes**: Should work fine, but avoid Node.js-specific APIs

### Routes That Need Node.js Runtime

If you have routes that need Node.js runtime, add this at the top of the file:
```typescript
export const runtime = 'nodejs';
```

## 🔒 Security Configuration

### Update CORS and OAuth Redirect URLs

After deployment, update these settings:

1. **Google Cloud Console**
   - Add your Cloudflare Pages URL to authorized origins
   - Add `https://your-domain.pages.dev/api/auth/callback/google` to redirect URIs

2. **Better Auth Configuration**
   - Ensure `BETTER_AUTH_URL` matches your Cloudflare domain
   - Update `baseURL` in `apps/web/lib/auth/index.ts` for production

## 🧪 Testing Your Deployment

After deployment, test these features:

1. ✅ Homepage loads correctly
2. ✅ Sign in with email/password works
3. ✅ Google OAuth sign-in works
4. ✅ Protected routes redirect to sign-in
5. ✅ Database queries work
6. ✅ All service pages load
7. ✅ Checkout flow works

## 📊 Performance Optimization

Cloudflare Pages automatically provides:
- Global CDN distribution
- Automatic HTTPS
- HTTP/2 and HTTP/3
- Brotli compression
- DDoS protection

## 🐛 Troubleshooting

### Build Fails

**Issue**: `pnpm: command not found`
**Solution**: Ensure Node version is set to 18+ and pnpm is available. Cloudflare should auto-detect it.

**Issue**: `DATABASE_URL is not defined`
**Solution**: Ensure environment variables are set in Cloudflare dashboard.

### Runtime Errors

**Issue**: `Module not found` errors
**Solution**: Check that `transpilePackages` in `next.config.mjs` includes all workspace packages.

**Issue**: Authentication not working
**Solution**: 
- Verify `BETTER_AUTH_URL` matches your deployment URL
- Check Google OAuth redirect URLs
- Ensure cookies are set with proper `secure` and `sameSite` settings

### Database Connection Issues

**Issue**: Database connection fails
**Solution**:
- Verify `DATABASE_URL` is correctly set
- Ensure Neon database allows connections from Cloudflare IPs (it should by default)
- Check that the database URL uses the HTTP connection string format

## 🔄 Continuous Deployment

Once configured, Cloudflare Pages will automatically:
- Deploy on every push to your main branch
- Create preview deployments for pull requests
- Show deployment status in your repository

## 📱 Custom Domain

To add a custom domain:
1. Go to your Pages project
2. Navigate to `Custom domains`
3. Click `Set up a custom domain`
4. Follow the DNS configuration instructions

## 📈 Monitoring

Use Cloudflare's Analytics:
- Workers & Pages > Your Project > Analytics
- Monitor requests, bandwidth, and errors
- Set up alerts for downtime

## 🎯 Production Checklist

Before going live:

- [ ] All environment variables are set correctly
- [ ] Google OAuth redirect URLs include production domain
- [ ] Database migrations are applied
- [ ] Custom domain is configured (if applicable)
- [ ] SSL/TLS is working (automatic with Cloudflare)
- [ ] Test all critical user flows
- [ ] Set up error monitoring (consider Sentry or similar)
- [ ] Configure rate limiting if needed
- [ ] Review and optimize bundle size
- [ ] Test on multiple devices and browsers

## 🆘 Support Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Turborepo Deployment Guide](https://turbo.build/repo/docs/handbook/deploying-with-docker)

---

**Note**: This project is currently configured for Vercel but is fully compatible with Cloudflare Pages. The main difference is the build process and environment variable configuration.
