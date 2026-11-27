"use server";

import { auth } from "./auth";

export type EmailStatus = "new" | "verified" | "unverified" | "social-only";

/**
 * First step of the email-first form: decides whether to show sign-up,
 * password, verify-your-email, or "use Google" next.
 * Note: this reveals whether an email has an account (same trade-off Apple makes).
 */
export async function checkEmail(email: string): Promise<EmailStatus> {
  const ctx = await auth.$context;
  const found = await ctx.internalAdapter.findUserByEmail(email.trim().toLowerCase(), { includeAccounts: true });
  if (!found) return "new";
  if (!found.accounts.some((a) => a.providerId === "credential")) return "social-only";
  return found.user.emailVerified ? "verified" : "unverified";
}
