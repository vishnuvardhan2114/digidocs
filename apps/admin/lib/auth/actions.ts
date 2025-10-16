"use server";

import { cookies, headers } from "next/headers";
import { z } from "zod";
import { db } from "@repo/database/connection";
import { eq, users } from "@repo/database/schema";
import { auth } from ".";

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

// ========================================
// AUTHENTICATION ACTIONS
// ========================================

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
});

export async function signUp(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // Validate input
    const validatedData = signUpSchema.parse(rawData);

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

    // Step 2: Update user to mark as admin and profile complete
    const [updatedUser] = await db
      .update(users)
      .set({
        isAdmin: true,
        profileCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, res.user.id))
      .returning();

    return {
      success: true,
      user: updatedUser,
      error: null,
    };
  } catch (error: any) {
    console.error("Admin sign up error:", error);

    // Parse error message
    let errorMessage = "Admin sign up failed. Please try again.";
    
    if (error.message?.includes("duplicate") || error.message?.includes("already exists")) {
      errorMessage = "An admin account with this email already exists.";
    } else if (error instanceof z.ZodError) {
      errorMessage = error.issues?.[0]?.message ?? "Invalid input.";
    } else if (error.message?.includes("Access denied")) {
      errorMessage = "Admin account creation is restricted.";
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

    return {
      success: true,
      user: res.user,
      error: null,
    };
  } catch (error: any) {
    console.error("Admin sign in error:", error);

    // Parse error message
    let errorMessage = "Invalid email or password.";
    
    if (error.message?.includes("Access denied")) {
      errorMessage = "Admin privileges required. Access denied.";
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

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error("Admin sign out error:", error);
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

    // Ensure user is admin
    if (fullUser && !fullUser.isAdmin) {
      return null;
    }

    return fullUser ?? (session.user as any);
  } catch (error) {
    console.error("Get current admin user error:", error);
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

    // Ensure user is admin
    if (fullUser && !fullUser.isAdmin) {
      return {
        user: null,
        session: null,
      };
    }

    return {
      user: fullUser ?? (session.user as any),
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
// ADMIN UTILITIES
// ========================================

export async function requireAdmin() {
  const user = await getCurrentUser();
  
  if (!user || !user.isAdmin) {
    throw new Error("Admin privileges required");
  }
  
  return user;
}

export async function isAdmin(email: string): Promise<boolean> {
  try {
    const [user] = await db
      .select({ isAdmin: users.isAdmin })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user?.isAdmin ?? false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}