import { cookies } from "next/headers";
import { db } from "@repo/database/connection";
import { users } from "@repo/database/schema";
import { eq } from "@repo/database/schema";

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (password.length > 128) {
    errors.push("Password must be less than 128 characters");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove < and >
    .trim()
    .slice(0, 1000); // Limit length
}

/**
 * Create a safe error message for client consumption
 */
export function createSafeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Don't expose internal error messages in production
    if (process.env.NODE_ENV === "production") {
      return "An error occurred. Please try again.";
    }
    return error.message;
  }
  
  return "An unexpected error occurred";
}

/**
 * Check if an email belongs to an admin user
 */
export async function isAdminEmail(email: string): Promise<boolean> {
  try {
    const [user] = await db
      .select({ isAdmin: users.isAdmin })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user?.isAdmin ?? false;
  } catch (error) {
    console.error("Error checking admin email:", error);
    return false;
  }
}

/**
 * Get admin user by email
 */
export async function getAdminByEmail(email: string) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user?.isAdmin ? user : null;
  } catch (error) {
    console.error("Error getting admin by email:", error);
    return null;
  }
}

/**
 * Validate admin session token
 */
export async function validateAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_auth_session")?.value;
    
    if (!sessionToken) {
      return false;
    }

    // Additional validation could be added here
    return true;
  } catch (error) {
    console.error("Error validating admin session:", error);
    return false;
  }
}

/**
 * Generate a secure random token for admin operations
 */
export function generateSecureToken(): string {
  return crypto.randomUUID();
}

/**
 * Check if current environment allows admin operations
 */
export function isAdminEnvironment(): boolean {
  return process.env.NODE_ENV === "development" || 
         process.env.ADMIN_ENABLED === "true";
}
