import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/hooks/use-auth";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await login.mutateAsync({ username, password });
    setLocation("/admin");
  }

  return (
    <PageLayout>
      <section className="min-h-[70vh] flex items-center justify-center px-4 py-24">
        <Card className="w-full max-w-md border-white/10 bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-display">Admin Login</CardTitle>
            <CardDescription>Access your admin dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            {login.isError && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Login failed</AlertTitle>
                <AlertDescription>
                  Check your credentials and try again.
                </AlertDescription>
              </Alert>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Username"
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={login.isPending}
              >
                {login.isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              No account yet?{" "}
              <Link href="/register" className="text-primary hover:text-primary/80">
                Create one
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageLayout>
  );
}
