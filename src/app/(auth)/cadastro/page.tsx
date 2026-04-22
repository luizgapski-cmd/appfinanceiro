"use client";

import { useActionState } from "react";
import Link from "next/link";
import { cadastroAction } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function CadastroPage() {
  const [state, action, pending] = useActionState(cadastroAction, undefined);

  if (state?.success) {
    return (
      <div className="w-full max-w-sm px-4">
        <Card>
          <CardHeader>
            <CardTitle>Cadastro realizado!</CardTitle>
            <CardDescription>{state.message}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "default" }), "w-full")}
            >
              Ir para o login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm px-4">
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Crie sua conta gratuita e comece a controlar suas finanças
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form action={action} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            {state?.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}
            <button
              type="submit"
              disabled={pending}
              className={cn(buttonVariants({ size: "default" }), "w-full")}
            >
              {pending ? "Criando conta..." : "Criar conta"}
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link
              href="/login"
              className="text-primary underline-offset-4 hover:underline"
            >
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
