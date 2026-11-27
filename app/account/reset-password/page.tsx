import ResetForm from "./_components/reset-form";

export default async function ResetPasswordPage({ searchParams }: PageProps<"/account/reset-password">) {
  const { token, error } = await searchParams;

  return (
    <main className="grid place-items-center">
      <section className="grid gap-4 p-6">
        <h1 className="text-2xl font-bold">Reset password</h1>
        {typeof token === "string" && !error ? <ResetForm token={token} /> : <p>This reset link is invalid or has expired.</p>}
      </section>
    </main>
  );
}
