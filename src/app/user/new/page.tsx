import { CreateUserForm } from "@/components/CreateUserForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cria a sua conta",
};

export default async function CreateUserPage() {
  return <CreateUserForm />;
}
