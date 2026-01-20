import { SpinLoader } from "@/components/SpinLoader";
import { UpdatePasswordForm } from "@/features/admin/components/UpdateUserPassword";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trocar senha",
};

export default async function AdminUserPasswordPage() {
  return (
    <Suspense fallback={<SpinLoader className="mb-16" />}>
      <UpdatePasswordForm />
    </Suspense>
  );
}
