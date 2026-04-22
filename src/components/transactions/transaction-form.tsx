"use client";

import { useActionState, useRef, useEffect } from "react";
import { createTransactionAction } from "@/app/actions/transactions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/types";

export function TransactionForm() {
  const [state, action, pending] = useActionState(
    createTransactionAction,
    undefined
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova transação</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          action={action}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div className="flex flex-col gap-1.5 lg:col-span-1">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              name="description"
              placeholder="Ex: Aluguel, Salário..."
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="date">Data</Label>
            <Input id="date" name="date" type="date" required />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="type">Tipo</Label>
            <select
              id="type"
              name="type"
              required
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="">Selecione...</option>
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="category">Categoria</Label>
            <select
              id="category"
              name="category"
              required
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="">Selecione...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-end gap-1.5">
            <button
              type="submit"
              disabled={pending}
              className={cn(buttonVariants({ size: "default" }), "w-full")}
            >
              {pending ? "Salvando..." : "Adicionar"}
            </button>
          </div>

          {state?.error && (
            <p className="text-sm text-destructive sm:col-span-2 lg:col-span-3">
              {state.error}
            </p>
          )}
          {state?.success && (
            <p className="text-sm text-green-600 sm:col-span-2 lg:col-span-3">
              Transação adicionada com sucesso!
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
