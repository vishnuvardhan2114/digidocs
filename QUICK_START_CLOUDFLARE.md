# Quick Start: Deploy to Cloudflare Pages

This is a condensed guide to get your app deployed quickly. For detailed information, see [CLOUDFLARE_DEPLOYMENT_GUIDE.md](./CLOUDFLARE_DEPLOYMENT_GUIDE.md).

## 🚀 5-Minute Deployment

### Step 1: Install Cloudflare Dependencies (Optional for CLI deployment)

```bash
cd apps/web
pnpm add -D @cloudflare/next-on-pages vercel wrangler
```

### Step 2: Push to Git Repository

```bash
git add .
git commit -m "Prepare for Cloudflare deployment"
git push origin main
```

### Step 3: Deploy via Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Select your repository and authorize Cloudflare

### Step 4: Configure Build Settings

Use these exact settings:

```
Framework preset: Next.js
Build command: pnpm install && pnpm turbo run build --filter=web...
Build output directory: apps/web/.next
Root directory: (leave blank)
Node version: 18
```

### Step 5: Add Environment Variables

In the Cloudflare dashboard, go to **Settings** → **Environment variables** and add:

| Variable Name | Value |
|---------------|-------|
| `DATABASE_URL` | Your Neon database connection string |
| `BETTER_AUTH_SECRET` | A random 32+ character string |
| `BETTER_AUTH_URL` | https://your-project.pages.dev |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | https://your-project.pages.dev |
| `GOOGLE_CLIENT_ID` | Your Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth client secret |
| `NODE_VERSION` | 18 |

### Step 6: Deploy!

Click **Save and Deploy**. Your app will be live in 2-3 minutes! 🎉

## After Deployment

### Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services** → **Credentials**
3. Select your OAuth 2.0 Client ID
4. Add to **Authorized JavaScript origins**:
   - `https://your-project.pages.dev`
5. Add to **Authorized redirect URIs**:
   - `https://your-project.pages.dev/api/auth/callback/google`

## Alternative: Deploy from CLI

```bash
# Install Wrangler globally
pnpm add -g wrangler

# Login
wrangler login

# Build and deploy
cd apps/web
pnpm run build:cloudflare
wrangler pages deploy .vercel/output/static --project-name=digidocs
```

## Using GitHub Actions (Automated)

The repository includes a GitHub Actions workflow (`.github/workflows/cloudflare-deploy.yml`).

To use it:

1. Get your Cloudflare API Token:
   - Go to Cloudflare Dashboard → My Profile → API Tokens
   - Create Token → Edit Cloudflare Workers → Use template
   - Copy the token

2. Add secrets to GitHub:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add these secrets:
     - `CLOUDFLARE_API_TOKEN`
     - `CLOUDFLARE_ACCOUNT_ID` (found in Cloudflare dashboard)
     - `DATABASE_URL`
     - `BETTER_AUTH_SECRET`
     - `BETTER_AUTH_URL`
     - `NEXT_PUBLIC_BETTER_AUTH_URL`
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`

3. Push to main branch - automatic deployment! ✨

## Troubleshooting

### Build Fails with "pnpm: command not found"

**Solution**: Ensure Node version is set to 18+ in Cloudflare settings.

### "DATABASE_URL is not defined" Error

**Solution**: Double-check environment variables in Cloudflare dashboard.

### OAuth Not Working

**Solution**: 
1. Verify redirect URLs in Google Console
2. Check `BETTER_AUTH_URL` matches your deployment URL
3. Clear browser cookies and try again

## Need Help?

- Check [CLOUDFLARE_DEPLOYMENT_GUIDE.md](./CLOUDFLARE_DEPLOYMENT_GUIDE.md) for detailed troubleshooting
- Visit [Cloudflare Community](https://community.cloudflare.com/)
- Check [Better Auth Docs](https://www.better-auth.com/docs)

---

**Your app is now running on Cloudflare's global network! 🌍**

