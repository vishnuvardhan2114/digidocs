# Cloudflare Deployment Checklist

Use this checklist to ensure a smooth deployment to Cloudflare Pages.

## Pre-Deployment Checklist

### 1. Repository Setup
- [ ] Code is pushed to Git repository (GitHub, GitLab, or Bitbucket)
- [ ] Repository is accessible and not private (or Cloudflare has access)
- [ ] Latest changes are committed and pushed

### 2. Database Setup
- [ ] Neon PostgreSQL database is created
- [ ] Database URL is noted down (format: `postgresql://...`)
- [ ] Database migrations are applied (`pnpm --filter @repo/database db:push`)
- [ ] Database tables are created successfully

### 3. Authentication Setup
- [ ] Google OAuth client ID and secret obtained
- [ ] Google Console authorized origins configured
- [ ] Better Auth secret generated (32+ characters)
- [ ] All auth environment variables documented

### 4. Environment Variables Prepared
Prepare these values (you'll add them in Cloudflare):

```
DATABASE_URL=_________________
BETTER_AUTH_SECRET=_________________
BETTER_AUTH_URL=https://your-project.pages.dev
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-project.pages.dev
GOOGLE_CLIENT_ID=_________________
GOOGLE_CLIENT_SECRET=_________________
NODE_VERSION=18
```

## Deployment Steps

### 5. Cloudflare Account Setup
- [ ] Cloudflare account created (free tier is fine)
- [ ] Email verified
- [ ] Logged into dashboard

### 6. Create Pages Project
- [ ] Navigate to Workers & Pages → Create application → Pages
- [ ] Connect to Git provider
- [ ] Select correct repository
- [ ] Authorize Cloudflare to access repository

### 7. Configure Build Settings
- [ ] Framework preset: **Next.js**
- [ ] Build command: `pnpm install && pnpm turbo run build --filter=web...`
- [ ] Build output directory: `apps/web/.next`
- [ ] Root directory: (leave blank)
- [ ] Environment variables added (production)
- [ ] Node version set to 18

### 8. Initial Deployment
- [ ] Click "Save and Deploy"
- [ ] Wait for build to complete (usually 2-5 minutes)
- [ ] Check build logs for errors
- [ ] Deployment successful

## Post-Deployment Checklist

### 9. Verify Deployment
- [ ] Website loads at `https://your-project.pages.dev`
- [ ] Homepage renders correctly
- [ ] Static assets (images, CSS) load properly
- [ ] Console shows no critical errors

### 10. Update OAuth Redirect URLs
- [ ] Go to Google Cloud Console → Credentials
- [ ] Add production URL to Authorized JavaScript origins:
  - `https://your-project.pages.dev`
- [ ] Add OAuth callback to Authorized redirect URIs:
  - `https://your-project.pages.dev/api/auth/callback/google`
- [ ] Save changes

### 11. Test Authentication
- [ ] Sign in with email/password works
- [ ] Sign in with Google OAuth works
- [ ] User session persists after page refresh
- [ ] Sign out works correctly
- [ ] Protected routes redirect properly

### 12. Test Core Features
- [ ] Browse services pages
- [ ] Upload documents (if applicable)
- [ ] Checkout flow works
- [ ] Database queries execute successfully
- [ ] Forms submit correctly

### 13. Performance & Security
- [ ] HTTPS is enabled (automatic with Cloudflare)
- [ ] Custom domain configured (if applicable)
- [ ] DNS records pointing correctly (if using custom domain)
- [ ] Test site speed (should be fast globally)
- [ ] Check browser console for warnings

### 14. Monitoring Setup
- [ ] Cloudflare Analytics enabled
- [ ] Set up error monitoring (optional: Sentry, LogRocket)
- [ ] Configure uptime monitoring (optional)
- [ ] Test alert notifications

## Optional: Advanced Configuration

### 15. Custom Domain (Optional)
- [ ] Custom domain purchased
- [ ] Added in Cloudflare Pages settings
- [ ] DNS records configured
- [ ] SSL certificate issued
- [ ] Update environment variables with custom domain
- [ ] Update Google OAuth URLs with custom domain

### 16. CI/CD Setup (Optional)
- [ ] GitHub Actions workflow configured (`.github/workflows/cloudflare-deploy.yml`)
- [ ] Cloudflare API token created
- [ ] Secrets added to GitHub repository
- [ ] Test automated deployment
- [ ] Preview deployments work for PRs

### 17. Database Backups
- [ ] Neon automatic backups enabled
- [ ] Backup schedule configured
- [ ] Test restore process (in development)

## Common Issues & Solutions

### Build Fails
- **Issue**: "pnpm: command not found"
  - **Fix**: Ensure NODE_VERSION is set to 18 or higher
  
- **Issue**: "DATABASE_URL is not defined"
  - **Fix**: Check environment variables in Cloudflare dashboard
  
- **Issue**: Turbo cache errors
  - **Fix**: Add `--force` to build command temporarily

### Runtime Errors
- **Issue**: "Module not found"
  - **Fix**: Verify `transpilePackages` in `next.config.mjs`
  
- **Issue**: OAuth not working
  - **Fix**: Double-check redirect URLs in Google Console
  
- **Issue**: Database connection errors
  - **Fix**: Ensure DATABASE_URL is correctly formatted

### Performance Issues
- **Issue**: Slow page loads
  - **Fix**: Check Cloudflare Analytics for bottlenecks
  - **Fix**: Optimize images and reduce bundle size

## Success Criteria

Your deployment is successful when:

✅ Website loads without errors  
✅ All authentication methods work  
✅ Database operations execute successfully  
✅ Protected routes function correctly  
✅ OAuth redirects work properly  
✅ Forms submit and process data  
✅ No console errors on critical pages  
✅ HTTPS is working  
✅ Site is accessible globally  

## Final Notes

- Save your Cloudflare project URL
- Document your custom domain (if used)
- Keep environment variables secure
- Monitor deployment logs for first 24 hours
- Test thoroughly before announcing launch

**Deployment Date**: ___________  
**Project URL**: ___________  
**Custom Domain**: ___________  
**Deployed By**: ___________

---

Congratulations on your Cloudflare deployment! 🎉

