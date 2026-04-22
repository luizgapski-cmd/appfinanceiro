"use client";

import { logoutAction } from "@/app/actions/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
      >
        Sair
      </button>
    </form>
  );
}
