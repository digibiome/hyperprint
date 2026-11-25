"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ResetForm({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const newPassword = String(new FormData(e.currentTarget).get("password"));
    const { error } = await authClient.resetPassword({ newPassword, token });
    setPending(false);
    if (error) return setError(error.message ?? "Couldn't reset password");
    router.push("/account/login");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      <label htmlFor="password">New password</label>
      <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" />
      <button type="submit" disabled={pending}>Set password</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
