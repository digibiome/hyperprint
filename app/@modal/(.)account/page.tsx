import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Modal from "../_components/modal";
import LogOut from "./_components/log-out";

export default async function AccountModal() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/account/login");
  const { user } = session;

  return (
    <Modal>
      <section className="grid gap-4 p-6">
        <h1 className="text-2xl font-bold">Account</h1>
        <p>{user.name}</p>
        <p>
          {user.email} {user.emailVerified ? "(verified)" : "(not verified — check your inbox)"}
        </p>
        <LogOut />
      </section>
    </Modal>
  );
}
