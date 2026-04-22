import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { ExportCsvButton } from "@/components/transactions/export-csv-button";
import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { cn } from "@/lib/utils";
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

export default async function TransacoesPage({
  searchParams,
}: {
  searchParams: Promise<{
    date?: string;
    type?: string;
    category?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const { date = "", type = "", category = "", search = "" } = params;

  const supabase = await createClient();

  let query = supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  if (date) {
    query = query.eq("date", date);
  }

  if (type === "receita" || type === "despesa") {
    query = query.eq("type", type);
  }

  if (category) {
    query = query.eq("category", category);
  }

  if (search) {
    query = query.ilike("description", `%${search}%`);
  }

  const { data: transactions } = await query.returns<Transaction[]>();
  const all = transactions ?? [];

  return (
    <div className="flex flex-col gap-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transações</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie suas receitas e despesas
          </p>
        </div>
        <ExportCsvButton transactions={all} />
      </div>

      <TransactionForm />

      {/* Filtros — Suspense necessário por causa de useSearchParams no cliente */}
      <Suspense>
        <TransactionFilters
          defaultDate={date}
          defaultType={type}
          defaultCategory={category}
          defaultSearch={search}
        />
      </Suspense>

      {all.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            Nenhuma transação encontrada.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {all.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="text-muted-foreground">
                      {formatDate(t.date)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {t.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{t.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          t.type === "receita" ? "default" : "destructive"
                        }
                      >
                        {t.type === "receita" ? "Receita" : "Despesa"}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-semibold",
                        t.type === "receita"
                          ? "text-green-600"
                          : "text-destructive"
                      )}
                    >
                      {t.type === "receita" ? "+" : "-"}
                      {formatCurrency(Number(t.amount))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
