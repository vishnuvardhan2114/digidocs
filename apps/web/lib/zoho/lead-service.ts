"use server";

import { db } from "@repo/database/connection";
import { users, eq } from "@repo/database/schema";
import type { User } from "@repo/database/schema";

export async function createZohoLead(user: User) {
  try {
    // Check if lead already exists
    if (user.zohoLeadCreated) {
      console.log(`Lead already exists for user ${user.id}`);
      return;
    }

    // Dynamic import to avoid webpack bundling issues
    const { ZohoHTTPClient } = await import("@repo/zoho-crm");
    const leadService = await ZohoHTTPClient();

    const leadData = {
      firstName: user.name?.split(" ")[0] || "User",
      lastName: user.name?.split(" ").slice(1).join(" ") || "",
      email: user.email,
      phone: user.phone || undefined,
      leadSource: "DigiDocs Platform",
      description: `New user registered on ${new Date().toISOString()}`,
    };

    const result = await leadService.createLead(leadData);

    if (result.success && result.leadId) {
      // Update user record with Zoho lead info
      await db
        .update(users)
        .set({
          zohoLeadId: result.leadId,
          zohoLeadCreated: true,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id));

      console.log(`Created Zoho lead ${result.leadId} for user ${user.id}`);
    } else {
      console.error(
        `Failed to create Zoho lead for user ${user.id}:`,
        result.error
      );
    }
  } catch (error) {
    console.error("Error creating Zoho lead:", error);
    // Don't throw - lead creation failure shouldn't block auth flow
  }
}
