import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Meu Financeiro
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground text-lg">
        Controle suas receitas e despesas de forma simples e visual. Veja onde
        seu dinheiro está indo e tome melhores decisões.
      </p>
      <div className="mt-8 flex gap-4">
        <Button asChild size="lg">
          <Link href="/login">Entrar</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/cadastro">Criar conta</Link>
        </Button>
      </div>
    </main>
  );
}
