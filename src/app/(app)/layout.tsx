import Link from "next/link";
import { LogoutButton } from "@/components/navbar/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <nav className="mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between px-6">
          <Link href="/dashboard" className="font-semibold text-foreground">
            Meu Financeiro
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/transacoes"
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Transações
            </Link>
            <ThemeToggle />
            {user?.email && (
              <span className="hidden text-xs text-muted-foreground sm:block px-2">
                {user.email}
              </span>
            )}
            <LogoutButton />
          </div>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-screen-2xl px-6 py-8">{children}</main>
    </>
  );
}
