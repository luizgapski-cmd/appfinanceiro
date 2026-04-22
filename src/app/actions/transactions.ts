"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES } from "@/types";
import type { TransactionType, Category } from "@/types";

export async function createTransactionAction(
  _prevState: unknown,
  formData: FormData
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Não autorizado." };
  }

  const description = (formData.get("description") as string)?.trim();
  const amount = parseFloat(formData.get("amount") as string);
  const date = formData.get("date") as string;
  const type = formData.get("type") as TransactionType;
  const category = formData.get("category") as Category;

  if (!description || !date || !type || !category) {
    return { error: "Preencha todos os campos." };
  }

  if (isNaN(amount) || amount <= 0) {
    return { error: "O valor deve ser maior que zero." };
  }

  if (!["receita", "despesa"].includes(type)) {
    return { error: "Tipo inválido." };
  }

  if (!(CATEGORIES as readonly string[]).includes(category)) {
    return { error: "Categoria inválida." };
  }

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    description,
    amount,
    date,
    type,
    category,
  });

  if (error) {
    return { error: "Erro ao salvar transação. Tente novamente." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/transacoes");

  return { success: true };
}
