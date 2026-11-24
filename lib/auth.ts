import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { sendEmail } from "./email";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, { provider: "pg", schema }),

  emailAndPassword: {
    enabled: true,
    // New accounts can use the site right away; verification is enforced on the *next* sign-in (see hooks).
    requireEmailVerification: false,
    autoSignIn: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your Hyperprint password",
        text: `Reset your password: ${url}`,
        html: `<p><a href="${url}">Reset your password</a></p>`,
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your Hyperprint email",
        text: `Verify your email: ${url}`,
        html: `<p><a href="${url}">Verify your email</a></p>`,
      });
    },
  },

  socialProviders: {
    google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! },
  },

  account: {
    accountLinking: {
      trustedProviders: ["google"],
      // Let Google sign in to an existing *unverified* email account; the hook below then
      // removes the unproven password so whoever pre-registered the email loses access.
      // Deprecated in better-auth 1.7 — slated for removal in the next minor.
      requireLocalEmailVerified: false,
    },
  },

  databaseHooks: {
    account: {
      create: {
        after: async (account, ctx) => {
          if (account.providerId !== "google" || !ctx) return;
          const adapter = ctx.context.internalAdapter;
          const user = await adapter.findUserById(account.userId);
          if (!user || user.emailVerified) return;
          const credential = await adapter.findCredentialAccount(user.id);
          if (credential) await adapter.deleteAccount(credential.id);
          await adapter.deleteUserSessions(user.id);
          // better-auth marks the email verified right after this hook (Google vouches for it).
        },
      },
    },
  },

  hooks: {
    // An existing account with an unverified email must verify before signing in again.
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-in/email") return;
      const email = String(ctx.body?.email ?? "").toLowerCase();
      const found = await ctx.context.internalAdapter.findUserByEmail(email);
      if (found && !found.user.emailVerified) {
        throw new APIError("FORBIDDEN", { code: "EMAIL_NOT_VERIFIED", message: "Verify your email to continue" });
      }
    }),
  },

  plugins: [nextCookies()],
});
