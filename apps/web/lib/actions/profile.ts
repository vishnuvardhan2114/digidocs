"use server";

import { z } from "zod";
import { db } from "@repo/database/connection";
import { users, eq } from "@repo/database/schema";
import { getCurrentUser } from "@/lib/auth/actions";
import { revalidatePath } from "next/cache";

// Phone number schema with country code removal
const phoneNumberSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits")
  .regex(/^(\+?91|91)?[6-9]\d{9}$/, "Enter a valid Indian mobile number")
  .transform((value) => {
    const cleaned = value.replace(/^\+?91/, '').trim();
    return cleaned;
  });

const completeProfileSchema = z.object({
  phone: phoneNumberSchema,
});

/**
 * Complete user profile with phone number
 * Called after Google OAuth signup
 */
export async function completeProfile(formData: FormData) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return {
        success: false,
        error: "Not authenticated. Please sign in.",
      };
    }

    const rawData = {
      phone: formData.get("phone") as string,
    };

    // Validate input
    const validatedData = completeProfileSchema.parse(rawData);

    // Check if phone already exists for another user
    const existingPhone = await db
      .select()
      .from(users)
      .where(eq(users.phone, validatedData.phone))
      .limit(1);

    if (existingPhone.length > 0 && existingPhone?.[0]?.id !== user.id) {
      return {
        success: false,
        error: "This phone number is already registered.",
      };
    }

    // Update user profile
    const [updatedUser] = await db
      .update(users)
      .set({
        phone: validatedData.phone,
        profileCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
      .returning();

    revalidatePath("/profile");

    return {
      success: true,
      user: updatedUser,
      error: null,
    };
  } catch (error: any) {
    console.error("Complete profile error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues?.[0]?.message ?? "Failed to update profile. Please try again.",
      };
    }

    return {
      success: false,
      error: "Failed to update profile. Please try again.",
    };
  }
}

/**
 * Check if user profile is complete
 */
export async function checkProfileCompletion() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return { isComplete: false, user: null };
    }

    const [userRecord] = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (!userRecord) {
      return { isComplete: false, user: null };
    }

    return {
      isComplete: !!userRecord.profileCompleted,
      user: userRecord,
      needsPhone: !userRecord.phone,
    };
  } catch (error) {
    console.error("Check profile completion error:", error);
    return { isComplete: false, user: null };
  }
}

