export interface ZohoLeadData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  leadSource?: string;
  description?: string;
}

export interface ZohoConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  redirectUri: string;
  environment: "sandbox" | "production";
}

export interface CreateLeadResponse {
  success: boolean;
  leadId?: string;
  error?: string;
}
