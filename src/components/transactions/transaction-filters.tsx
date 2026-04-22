"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/types";

interface TransactionFiltersProps {
  defaultDate: string;
  defaultType: string;
  defaultCategory: string;
  defaultSearch: string;
}

export function TransactionFilters({
  defaultDate,
  defaultType,
  defaultCategory,
  defaultSearch,
}: TransactionFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(defaultSearch);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  // Debounce: só navega 400ms após o usuário parar de digitar
  useEffect(() => {
    const timer = setTimeout(() => updateParam("search", searchValue), 400);
    return () => clearTimeout(timer);
  }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-wrap gap-3">
      {/* Busca por descrição */}
      <div className="relative min-w-[200px] flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por descrição..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* Filtro por data específica */}
      <input
        type="date"
        defaultValue={defaultDate}
        onChange={(e) => updateParam("date", e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />

      {/* Filtro de tipo */}
      <select
        defaultValue={defaultType}
        onChange={(e) => updateParam("type", e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">Todos os tipos</option>
        <option value="receita">Receita</option>
        <option value="despesa">Despesa</option>
      </select>

      {/* Filtro de categoria */}
      <select
        defaultValue={defaultCategory}
        onChange={(e) => updateParam("category", e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">Todas as categorias</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
