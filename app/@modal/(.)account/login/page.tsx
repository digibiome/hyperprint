import Modal from "../../_components/modal";
import AuthForm from "./_components/auth-form";

export default function LoginModal() {
  return (
    <Modal>
      <section className="grid gap-4 p-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <AuthForm />
      </section>
    </Modal>
  );
}
