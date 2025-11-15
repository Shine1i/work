import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "~/features/auth/components/signup-form";

export const Route = createFileRoute("/(auth-pages)/signup")({
  component: SignupPage,
});

function SignupPage() {
  const { redirectUrl } = Route.useRouteContext();

  return <SignupForm redirectUrl={redirectUrl} />;
}
