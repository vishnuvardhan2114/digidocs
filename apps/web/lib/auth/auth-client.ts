
import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";
import { oneTapClient } from "better-auth/client/plugins";

const plugins: any[] = [nextCookies()];

// Only add oneTapClient if Google Client ID is available
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
  plugins.push(
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",
      additionalOptions: {
        ux_mode: "popup",
        hosted_domain: "",
        immediate: false
      },
      promptOptions: {
        baseDelay: 1000,
        maxAttempts: 3
      }
    })
  );
}

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3001",
  plugins,
});

export const { 
  signIn, 
  signOut, 
  signUp, 
  useSession 
} = authClient;