interface ZohoLeadData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  leadSource?: string;
  description?: string;
}

interface CreateLeadResponse {
  success: boolean;
  leadId?: string;
  error?: string;
}

export class ZohoHTTPClient {
  private accessToken: string;
  private baseUrl: string;

  private constructor(accessToken: string) {
    // Check if we're in a server environment
    if (typeof process === "undefined") {
      throw new Error("ZohoHTTPClient can only be used in server environment");
    }

    this.accessToken = accessToken;
    this.baseUrl =
      process.env.ZOHO_ENVIRONMENT === "production"
        ? "https://www.zohoapis.in/crm/v6"
        : "https://sandbox.zohoapis.in/crm/v6";
  }

  public static async create(): Promise<ZohoHTTPClient> {
    const accessToken = await this.getAccessToken();
    return new ZohoHTTPClient(accessToken);
  }

  private static async getAccessToken(): Promise<string> {
    if (typeof process === "undefined") {
      throw new Error(
        "ZohoHTTPClient can only be used in a server environment"
      );
    }

    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;

    if (!refreshToken || !clientId || !clientSecret) {
      throw new Error(
        "Zoho refresh token, client ID, or client secret not configured"
      );
    }

    const tokenUrl = "https://accounts.zoho.in/oauth/v2/token";
    const params = new URLSearchParams();
    params.append("refresh_token", refreshToken);
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("grant_type", "refresh_token");

    const response = await fetch(tokenUrl, {
      method: "POST",
      body: params,
    });

    const result = await response.json();

    if (result.access_token) {
      return result.access_token;
    }

    throw new Error(result.error || "Failed to get Zoho access token");
  }

  async createLead(userData: ZohoLeadData): Promise<CreateLeadResponse> {
    try {
      if (!this.accessToken) {
        throw new Error("Zoho access token not configured");
      }

      const leadData = {
        data: [
          {
            First_Name: userData.firstName,
            Last_Name: userData.lastName || "",
            Email: userData.email,
            Phone: userData.phone || "",
            Lead_Source: userData.leadSource || "Website",
            Description:
              userData.description || "New user from DigiDocs platform",
          },
        ],
      };

      const response = await fetch(`${this.baseUrl}/Leads`, {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (
        result.data &&
        result.data[0] &&
        result.data[0].details &&
        result.data[0].details.id
      ) {
        return {
          success: true,
          leadId: result.data[0].details.id,
        };
      }

      return {
        success: false,
        error: result.message || "Failed to create lead in Zoho CRM",
      };
    } catch (error: any) {
      console.error("Zoho HTTP lead creation error:", error);
      return {
        success: false,
        error: error.message || "Unknown error occurred",
      };
    }
  }
}
