"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { checkEmail, type EmailStatus } from "@/lib/check-email";

type Step = "email" | EmailStatus | "reset-sent";

/** Email-first sign in / sign up: the step after "Continue" depends on whether the email has an account. */
export default function AuthForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function run(task: () => Promise<void>) {
    setPending(true);
    setError(null);
    try {
      await task();
    } finally {
      setPending(false);
    }
  }

  const sendVerification = () => authClient.sendVerificationEmail({ email, callbackURL: "/account" });

  function onEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    run(async () => {
      const status = await checkEmail(email);
      if (status === "unverified") await sendVerification();
      setStep(status);
    });
  }

  function onSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password"));
    run(async () => {
      const { error } = await authClient.signIn.email({ email, password });
      if (error?.code === "EMAIL_NOT_VERIFIED") {
        await sendVerification();
        return setStep("unverified");
      }
      if (error) return setError(error.message ?? "Couldn't sign in");
      router.push("/account");
      router.refresh();
    });
  }

  function onSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    run(async () => {
      const { error } = await authClient.signUp.email({
        email,
        name: String(data.get("name")),
        password: String(data.get("password")),
        callbackURL: "/account",
      });
      if (error) return setError(error.message ?? "Couldn't create account");
      router.push("/account");
      router.refresh();
    });
  }

  function onForgot() {
    run(async () => {
      await authClient.requestPasswordReset({ email, redirectTo: "/account/reset-password" });
      setStep("reset-sent");
    });
  }

  function onGoogle() {
    run(async () => {
      await authClient.signIn.social({ provider: "google", callbackURL: "/account" });
    });
  }

  return (
    <div className="grid gap-4">
      {step === "email" ? (
        <form onSubmit={onEmail} className="grid gap-2">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" disabled={pending}>Continue</button>
        </form>
      ) : (
        <p>
          {email}{" "}
          <button type="button" onClick={() => setStep("email")}>Change</button>
        </p>
      )}

      {step === "verified" && (
        <form onSubmit={onSignIn} className="grid gap-2">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" autoFocus />
          <button type="submit" disabled={pending}>Sign in</button>
          <button type="button" onClick={onForgot} disabled={pending}>Forgot password?</button>
        </form>
      )}

      {step === "new" && (
        <form onSubmit={onSignUp} className="grid gap-2">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required autoComplete="name" autoFocus />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" />
          <button type="submit" disabled={pending}>Create account</button>
        </form>
      )}

      {step === "unverified" && (
        <div className="grid gap-2">
          <p>Verify your email to continue. We sent a link to {email}.</p>
          <button type="button" onClick={() => run(async () => void (await sendVerification()))} disabled={pending}>
            Resend link
          </button>
        </div>
      )}

      {step === "social-only" && <p>This email signs in with Google.</p>}

      {step === "reset-sent" && <p>If {email} has a password, we sent a reset link.</p>}

      {error && <p role="alert">{error}</p>}

      <button type="button" onClick={onGoogle} disabled={pending}>Continue with Google</button>
    </div>
  );
}
