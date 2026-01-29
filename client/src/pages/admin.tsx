import PageLayout from "@/components/PageLayout";
import RequireAuth from "@/components/RequireAuth";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function Admin() {
  const { user, logout } = useAuth();

  return (
    <RequireAuth>
      <PageLayout>
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-display">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Manage your projects and posts here.
                </p>
                {user && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Signed in as <span className="text-foreground">{user.username}</span>
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                className="border-white/10"
                onClick={() => logout.mutateAsync()}
                disabled={logout.isPending}
              >
                {logout.isPending ? "Signing out..." : "Sign out"}
              </Button>
            </div>
            <div className="mt-10 rounded-2xl border border-white/10 bg-card/40 p-8 text-muted-foreground">
              Build the admin experience next: add project and post editors, and hook them to the API.
            </div>
          </div>
        </section>
      </PageLayout>
    </RequireAuth>
  );
}
