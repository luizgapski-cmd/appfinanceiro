import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  BarChart3,
  Shield,
  Download,
  Smartphone,
  Tag,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Dashboard completo",
    description:
      "Veja receitas, despesas e saldo do mês em um painel visual e moderno.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: BarChart3,
    title: "Gráficos por categoria",
    description:
      "Entenda para onde vai o seu dinheiro com gráficos de pizza por categoria.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: Shield,
    title: "Dados seguros",
    description:
      "Autenticação segura e Row Level Security: só você acessa seus dados.",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  {
    icon: Download,
    title: "Exportar CSV",
    description:
      "Exporte suas transações filtradas para Excel ou Google Sheets a qualquer hora.",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    description:
      "Interface responsiva que funciona perfeitamente no celular e no desktop.",
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
  {
    icon: Tag,
    title: "Categorias prontas",
    description:
      "9 categorias pré-definidas para classificar receitas e despesas rapidamente.",
    color: "text-teal-500",
    bg: "bg-teal-50 dark:bg-teal-950/30",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <span className="font-semibold text-foreground">
            Finanças Pessoais
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              Começar grátis
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4 py-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm text-muted-foreground shadow-sm">
            <CheckCircle className="size-4 text-primary" />
            100% gratuito e sem anúncios
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Controle suas finanças{" "}
            <span className="text-primary">com clareza</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Registre receitas e despesas, acompanhe seu saldo em tempo real e
            visualize gráficos por categoria. Simples, rápido e seguro.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/cadastro"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 px-8")}
            >
              Criar conta grátis →
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-8"
              )}
            >
              Já tenho conta
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-muted/30 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Tudo que você precisa
              </h2>
              <p className="mt-3 text-muted-foreground">
                Uma ferramenta completa para organizar sua vida financeira de
                forma visual e intuitiva.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border bg-card p-6 shadow-sm"
                >
                  <div
                    className={cn(
                      "mb-4 inline-flex size-12 items-center justify-center rounded-lg",
                      feature.bg
                    )}
                  >
                    <feature.icon className={cn("size-6", feature.color)} />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
