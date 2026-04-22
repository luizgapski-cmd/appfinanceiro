"use client";

import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types";

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

export function ExportCsvButton({ transactions }: { transactions: Transaction[] }) {
  function handleExport() {
    const headers = ["Data", "Descrição", "Categoria", "Tipo", "Valor (R$)"];
    const rows = transactions.map((t) => [
      formatDate(t.date),
      `"${t.description.replace(/"/g, '""')}"`,
      t.category,
      t.type === "receita" ? "Receita" : "Despesa",
      Number(t.amount).toFixed(2).replace(".", ","),
    ]);

    const csv = [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
    // BOM garante que Excel/Google Sheets leia acentos corretamente
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transacoes.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      disabled={transactions.length === 0}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}
    >
      <Download className="size-4" />
      Exportar CSV
    </button>
  );
}
