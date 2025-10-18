import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@repo/database/connection";
import * as schema from "@repo/database/schema";
import { v4 as uuidv4 } from "uuid";
import { nextCookies } from "better-auth/next-js";
import type { User } from "@repo/database/schema";

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
    async createUser(user: User) {
      return {
        ...user,
        isAdmin: true, 
      };
    },
    async signIn(user: User) {
      if (!user.isAdmin) {
        throw new Error("Access denied. Admin privileges required.");
      }
      return user;
    },
  },
  socialProviders: {},
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3002",
  secret: process.env.BETTER_AUTH_SECRET || "r2umLBkCcV8f3HPm3CGfljrmyfZOb4Xd",
  sessions: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7
    }
  },
  cookies: {
    sessionToken: {
      name: "admin_auth_session",
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
    csrfProtection: {
      enabled: true,
      sameSite: 'lax'
    }
  },
  plugins: [
    nextCookies()
  ]
});

// Re-export auth client and utilities for convenience
export { authClient } from "./auth-client";
export * from "./actions";
export * from "./utils";