import ErrorMessage from "@/components/ErrorMessage";
import { LoginForm } from "@/components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return (
      <ErrorMessage
        contentTitle="403"
        content="Libere o sistema de login usando ALLOW_LOGIN"
      />
    );
  }

  return <LoginForm />;
}
