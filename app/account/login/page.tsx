import AuthForm from "./_components/auth-form";

export default function LoginPage() {
  return (
    <main className="grid place-items-center">
      <section className="grid gap-4 p-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <AuthForm />
      </section>
    </main>
  );
}
