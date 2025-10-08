"use server";

import { cookies, headers } from "next/headers";
import { z } from "zod";
import { db } from "@repo/database/connection";
import { guests, eq, users } from "@repo/database/schema";
import { randomUUID } from "crypto";
import { auth } from ".";

const COOKIE_OPTIONS = {
  httpOnly: true as const,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
} as const;

// Validation schemas
const emailSchema = z.string().email("Invalid email address");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters");

const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters");

const phoneNumberSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits")
  .regex(/^(\+?91|91)?[6-9]\d{9}$/, "Enter a valid Indian mobile number")
  .transform((value) => {
    const cleaned = value.replace(/^\+?91/, '').trim();
    return cleaned;
  });

// ========================================
// GUEST SESSION MANAGEMENT
// ========================================

export async function createGuestSession() {
  const cookieStore = await cookies();
  const existing = cookieStore.get("guest_session");
  
  if (existing?.value) {
    return { ok: true, sessionToken: existing.value };
  }

  const sessionToken = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + COOKIE_OPTIONS.maxAge * 1000);

  await db.insert(guests).values({
    sessionToken,
    expiresAt,
  });

  cookieStore.set("guest_session", sessionToken, COOKIE_OPTIONS);
  return { ok: true, sessionToken };
}

export async function guestSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("guest_session")?.value;
  
  if (!token) {
    return { sessionToken: null };
  }

  // Validate guest session hasn't expired
  const [guest] = await db
    .select()
    .from(guests)
    .where(eq(guests.sessionToken, token))
    .limit(1);

  if (!guest) {
    // Token doesn't exist in DB
    cookieStore.delete("guest_session");
    return { sessionToken: null };
  }

  // Check if expired
  const now = new Date();
  if (guest.expiresAt < now) {
    // Session expired - clean up
    await db.delete(guests).where(eq(guests.id, guest.id));
    cookieStore.delete("guest_session");
    return { sessionToken: null };
  }

  return { sessionToken: token };
}

// ========================================
// AUTHENTICATION ACTIONS
// ========================================

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  phone: phoneNumberSchema,
});

export async function signUp(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      phone: formData.get("phone") as string,
    };

    // Validate input
    const validatedData = signUpSchema.parse(rawData);

    // Check if phone already exists
    const existingPhone = await db
      .select()
      .from(users)
      .where(eq(users.phone, validatedData.phone))
      .limit(1);

    if (existingPhone.length > 0) {
      return {
        success: false,
        user: null,
        error: "This phone number is already registered.",
      };
    }

    // Step 1: Create user with Better Auth (email, password, name only)
    const res = await auth.api.signUpEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.name,
      },
    });

    if (!res.user) {
      throw new Error("Failed to create user");
    }

    // Step 2: Update user with phone and mark profile as complete
    const [updatedUser] = await db
      .update(users)
      .set({
        phone: validatedData.phone,
        profileCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, res.user.id))
      .returning();

    // Step 3: Migrate any guest data
    await migrateGuestToUser();

    return {
      success: true,
      user: updatedUser,
      error: null,
    };
  } catch (error: any) {
    console.error("Sign up error:", error);

    // Parse error message
    let errorMessage = "Sign up failed. Please try again.";
    
    if (error.message?.includes("duplicate") || error.message?.includes("already exists")) {
      errorMessage = "An account with this email already exists.";
    } else if (error instanceof z.ZodError) {
      errorMessage = error.issues?.[0]?.message ?? "Invalid input.";
    }

    return {
      success: false,
      user: null,
      error: errorMessage,
    };
  }
}

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export async function signIn(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // Validate input
    const validatedData = signInSchema.parse(rawData);

    // Call Better Auth API
    const res = await auth.api.signInEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
      },
    });

    // Migrate any guest data
    await migrateGuestToUser();

    return {
      success: true,
      user: res.user,
      error: null,
    };
  } catch (error: any) {
    console.error("Sign in error:", error);

    // Parse error message
    let errorMessage = "Invalid email or password.";
    
    if (error instanceof z.ZodError) {
      errorMessage = error.issues?.[0]?.message ?? "Invalid input.";
    }

    return {
      success: false,
      user: null,
      error: errorMessage,
    };
  }
}

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error("Sign out error:", error);
    return {
      success: false,
      error: "Failed to sign out. Please try again.",
    };
  }
}

// ========================================
// SESSION MANAGEMENT
// ========================================

export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) return null;

    // Fetch full user record to get isAdmin, phone, profileCompleted fields
    const [fullUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    return fullUser ?? session.user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        user: null,
        session: null,
      };
    }

    // Fetch full user record to get all custom fields
    const [fullUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    return {
      user: fullUser ?? session.user,
      session: session.session,
    };
  } catch (error) {
    return {
      user: null,
      session: null,
    };
  }
}

// ========================================
// GUEST TO USER MIGRATION
// ========================================

async function migrateGuestToUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("guest_session")?.value;
    
    if (!token) return;

    const user = await getCurrentUser();
    if (!user) return;

    // Find guest record
    const [guest] = await db
      .select()
      .from(guests)
      .where(eq(guests.sessionToken, token))
      .limit(1);

    if (!guest) return;

    // TODO: When applications are implemented, migrate them here
    // await db
    //   .update(applications)
    //   .set({ userId: user.id, guestId: null })
    //   .where(eq(applications.guestId, guest.id));

    // Clean up guest session
    await db.delete(guests).where(eq(guests.id, guest.id));
    cookieStore.delete("guest_session");

    console.log(`Migrated guest ${guest.id} to user ${user.id}`);
  } catch (error) {
    console.error("Migration error:", error);
    // Don't throw - migration failure shouldn't block auth
  }
}