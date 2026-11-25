const FROM = "Hyperprint <account@hyprnt.com>";

/** Sends a transactional email through Resend's HTTP API. */
export async function sendEmail({ to, subject, text, html }: { to: string; subject: string; text: string; html: string }) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[email] to=${to} subject="${subject}"\n${text}`);
    if (!process.env.RESEND_API_KEY) return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to, subject, text, html }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
