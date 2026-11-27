import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Optimistic check only: no session cookie → straight to login.
 * The /account pages still validate the session on the server.
 */
export function proxy(request: NextRequest) {
  if (!getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/account",
};
