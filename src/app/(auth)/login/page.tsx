"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
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

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <div className="w-full max-w-sm px-4">
      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>
            Acesse sua conta para gerenciar suas finanças
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
              {pending ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Não tem conta?{" "}
            <Link
              href="/cadastro"
              className="text-primary underline-offset-4 hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
