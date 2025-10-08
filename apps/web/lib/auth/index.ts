import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@repo/database/connection";
import * as schema from "@repo/database/schema";
import { v4 as uuidv4 } from "uuid";
import {nextCookies} from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: [
        "openid",
        "email",
        "profile",
      ],
    },
  },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3001",
  secret: process.env.BETTER_AUTH_SECRET || "5wKVm5I7UeSUpXDytycljl0TTthVbCbe",
  sessions: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7
    }
  },
  cookies: {
    sessionToken: {
      name: "auth_session",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      }
    }
  },
  advanced: {
    database: {
      generateId: () => uuidv4()
    },
    // Add CSRF protection configuration
    csrfProtection: {
      enabled: true,
      sameSite: 'lax'
    }
  },
  plugins: [nextCookies()]
});