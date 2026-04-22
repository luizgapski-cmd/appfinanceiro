import Link from "next/link";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { CategoryCharts } from "@/components/dashboard/category-charts";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/types";
import type { Transaction } from "@/types";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false })
    .returns<Transaction[]>();

  const all = transactions ?? [];

  const totalReceitas = all
    .filter((t) => t.type === "receita")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalDespesas = all
    .filter((t) => t.type === "despesa")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const saldo = totalReceitas - totalDespesas;

  const recentes = all.slice(0, 5);

  const despesasPorCategoria = CATEGORIES.map((cat) => ({
    name: cat,
    value: all
      .filter((t) => t.type === "despesa" && t.category === cat)
      .reduce((sum, t) => sum + Number(t.amount), 0),
  })).filter((d) => d.value > 0);

  const receitasPorCategoria = CATEGORIES.map((cat) => ({
    name: cat,
    value: all
      .filter((t) => t.type === "receita" && t.category === cat)
      .reduce((sum, t) => sum + Number(t.amount), 0),
  })).filter((d) => d.value > 0);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Visão geral das suas finanças
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <p className="text-sm text-muted-foreground">Total de Receitas</p>
            <CardAction>
              <div className="rounded-lg bg-green-100 p-2 dark:bg-green-950/40">
                <TrendingUp className="size-5 text-green-600 dark:text-green-400" />
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(totalReceitas)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              no período selecionado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm text-muted-foreground">Total de Despesas</p>
            <CardAction>
              <div className="rounded-lg bg-red-100 p-2 dark:bg-red-950/40">
                <TrendingDown className="size-5 text-destructive" />
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">
              {formatCurrency(totalDespesas)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              no período selecionado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm text-muted-foreground">Saldo</p>
            <CardAction>
              <div className="rounded-lg bg-primary/10 p-2">
                <Wallet className="size-5 text-primary" />
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p
              className={cn(
                "text-2xl font-bold",
                saldo >= 0
                  ? "text-primary dark:text-blue-400"
                  : "text-destructive"
              )}
            >
              {formatCurrency(saldo)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {saldo >= 0 ? "positivo" : "negativo"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos por categoria */}
      <CategoryCharts
        despesas={despesasPorCategoria}
        receitas={receitasPorCategoria}
      />

      {/* Transações recentes */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transações recentes</h2>
          <Link
            href="/transacoes"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Ver todas
          </Link>
        </div>

        {recentes.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              Nenhuma transação ainda.{" "}
              <Link href="/transacoes" className="text-primary hover:underline">
                Adicione sua primeira transação.
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y">
                {recentes.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">
                        {t.description}
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {t.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(t.date)}
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        t.type === "receita"
                          ? "text-green-600 dark:text-green-400"
                          : "text-destructive"
                      )}
                    >
                      {t.type === "receita" ? "+" : "-"}
                      {formatCurrency(Number(t.amount))}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
