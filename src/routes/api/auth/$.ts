import { createServerFileRoute } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth/auth";

export const Route = createServerFileRoute("/api/auth/$").methods({
  GET: ({ request }) => {
    return auth.handler(request);
  },
  POST: ({ request }) => {
    return auth.handler(request);
  },
});
