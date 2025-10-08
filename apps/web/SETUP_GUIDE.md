# DigiDocs Authentication Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

Already installed:
- ✅ `better-auth` - Authentication library
- ✅ `zustand` - State management
- ✅ `zod` - Validation
- ✅ `uuid` - ID generation

### 2. Database Setup

Your Neon database should already have the following tables (from `packages/database`):
- `users`
- `sessions`
- `accounts`
- `verifications`
- `guests`

Run migrations:
```bash
cd packages/database
pnpm db:generate
pnpm db:migrate
```

### 3. Environment Variables

Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# Required for auth to work
DATABASE_URL="your-neon-database-url"
NEXT_PUBLIC_APP_URL="http://localhost:3001"
BETTER_AUTH_SECRET="generate-a-random-32-char-secret"
BETTER_AUTH_URL="http://localhost:3001"

# Optional: For Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

#### Generate BETTER_AUTH_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🔐 Google OAuth Setup

### Step 1: Create Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client ID**
5. Configure OAuth consent screen if needed
6. Application type: **Web application**
7. Add Authorized redirect URIs:
   ```
   http://localhost:3001/api/auth/callback/google
   ```
8. Copy **Client ID** and **Client Secret**

### Step 2: Add to .env.local

```env
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### Step 3: Test Google OAuth

1. Start the dev server: `pnpm dev`
2. Go to `http://localhost:3001/sign-in`
3. Click "Continue with Google"
4. You should be redirected to Google's consent screen

---

## 📝 Testing Authentication

### Test Email/Password Sign Up

1. Go to `http://localhost:3001/sign-up`
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click "Sign Up"
4. You should be redirected to homepage
5. Check your browser's Application tab > Cookies:
   - `auth_session` should be set
6. Check LocalStorage:
   - `digidocs-auth` should contain user data

### Test Email/Password Sign In

1. Go to `http://localhost:3001/sign-in`
2. Use the same credentials
3. Click "Sign In"
4. Should redirect to homepage

### Test Sign Out

1. Click on your user avatar/button
2. Click "Sign Out"
3. Session should be cleared

---

## 🧪 Verify Setup

### Check Database

```sql
-- Check if user was created
SELECT * FROM users;

-- Check if session was created
SELECT * FROM sessions;

-- Check if account was created
SELECT * FROM accounts;
```

### Check Cookies

In browser DevTools > Application > Cookies:
- `auth_session` should exist when signed in
- Should be `httpOnly`, `secure` (in production), `sameSite: strict`

### Check Zustand Store

In browser DevTools > Console:
```javascript
JSON.parse(localStorage.getItem('digidocs-auth'))
```

Should show:
```json
{
  "state": {
    "user": { "id": "...", "email": "...", "name": "..." },
    "isAuthenticated": true
  }
}
```

---

## 🛠️ Troubleshooting

### "Database connection failed"
- Check `DATABASE_URL` in `.env.local`
- Ensure Neon database is accessible
- Run migrations: `pnpm db:migrate`

### "BETTER_AUTH_SECRET is not defined"
- Add `BETTER_AUTH_SECRET` to `.env.local`
- Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Google OAuth not working
- Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Verify redirect URI in Google Console matches exactly:
  `http://localhost:3001/api/auth/callback/google`
- Check `NEXT_PUBLIC_APP_URL` is set correctly

### Session not persisting
- Check if `auth_session` cookie is being set
- Ensure `BETTER_AUTH_URL` matches your app URL
- Check browser console for errors

### Zustand state not updating
- Open browser console and check for errors
- Verify `AuthSyncProvider` is wrapping the app in `layout.tsx`
- Check `getSession()` server action is working

---

## 🔒 Security Checklist

- [x] Passwords are hashed (handled by Better Auth)
- [x] Sessions use httpOnly cookies
- [x] CSRF protection enabled (sameSite: strict)
- [x] Input validation with Zod
- [x] Server actions for all auth operations
- [x] Environment variables for secrets
- [ ] Enable `secure: true` in production (set `NODE_ENV=production`)
- [ ] Set up proper error logging in production
- [ ] Add rate limiting to auth endpoints (future)

---

## 📚 API Reference

### Server Actions

```typescript
// Sign up a new user
const result = await signUp(formData);

// Sign in existing user
const result = await signIn(formData);

// Sign out current user
const result = await signOut();

// Get current session
const { user, session } = await getSession();

// Get current user only
const user = await getCurrentUser();

// Create guest session
const { sessionToken } = await createGuestSession();
```

### Zustand Store

```typescript
import { useAuthStore } from '@/lib/store';

// Get user
const user = useAuthStore(state => state.user);

// Check if authenticated
const isAuthenticated = useAuthStore(state => state.isAuthenticated);

// Set user (after successful auth)
const setUser = useAuthStore(state => state.setUser);

// Clear user (on sign out)
const clearUser = useAuthStore(state => state.clearUser);
```

### Custom Hook

```typescript
import { useAuth } from '@/hooks/use-auth';

// In a component
const { user, isAuthenticated, isGuest } = useAuth();

// In a protected page
const { user } = useAuth({ requireAuth: true });
```

---

## 🎯 Next Steps

Now that authentication is set up, you can:

1. Create protected routes (already configured in `middleware.ts`)
2. Build user dashboard
3. Implement application management (document workflows)
4. Add email verification (optional)
5. Add password reset functionality (optional)
6. Set up Zoho CRM integration for applications

---

## 🐛 Debug Mode

Enable detailed logging:

```typescript
// In lib/auth/index.ts
export const auth = betterAuth({
  // ... existing config
  advanced: {
    debug: process.env.NODE_ENV === 'development',
  },
});
```

Check server logs for detailed auth flow information.

