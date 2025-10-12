
import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";
import { oneTapClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3001",
  plugins: [
    nextCookies(),
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
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
  ],
});

export const { 
  signIn, 
  signOut, 
  signUp, 
  useSession 
} = authClient;