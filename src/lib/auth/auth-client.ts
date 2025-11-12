import { createAuthClient } from "better-auth/react";
import { env } from "~/config/env/client";

const authClient = createAuthClient({
  baseURL: env.VITE_BASE_URL,
});

export default authClient;
