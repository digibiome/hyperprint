"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LogOut() {
  const router = useRouter();

  async function onClick() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={onClick}>
      Log out
    </button>
  );
}
