import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authQueryOptions } from "~/features/auth/api/queries";
import { SignOutButton } from "./SignOutButton";

export function UserStatus() {
  const { data: user } = useSuspenseQuery(authQueryOptions());

  return user ? (
    <div className="flex flex-col items-center gap-2">
      <p>Welcome back, {user.name}!</p>
      <Button type="button" asChild className="mb-2 w-fit" size="lg">
        <Link to="/dashboard">Go to Dashboard</Link>
      </Button>
      <div className="text-center text-xs sm:text-sm">
        Session user:
        <pre className="max-w-screen overflow-x-auto px-2 text-start">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <SignOutButton />
    </div>
  ) : (
    <div className="flex flex-col items-center gap-2">
      <p>You are not signed in.</p>
      <Button type="button" asChild className="w-fit" size="lg">
        <Link to="/login">Log in</Link>
      </Button>
    </div>
  );
}
