import { createAuthClient } from "better-auth/react";
import { emailOTPClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [
    emailOTPClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});

// Export useful hooks and methods
export const { useSession, signIn, signOut } = authClient;
export { authClient as default };
