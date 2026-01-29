import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/hooks/use-auth";

export default function Register() {
  const [, setLocation] = useLocation();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await register.mutateAsync({ username, password });
    setLocation("/admin");
  }

  return (
    <PageLayout>
      <section className="min-h-[70vh] flex items-center justify-center px-4 py-24">
        <Card className="w-full max-w-md border-white/10 bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-display">Create Admin</CardTitle>
            <CardDescription>Set up credentials for your dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            {register.isError && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Registration failed</AlertTitle>
                <AlertDescription>
                  Choose a different username and try again.
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
                  placeholder="Password (min 8 chars)"
                  autoComplete="new-password"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={register.isPending}
              >
                {register.isPending ? "Creating..." : "Create Account"}
              </Button>
            </form>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageLayout>
  );
}
