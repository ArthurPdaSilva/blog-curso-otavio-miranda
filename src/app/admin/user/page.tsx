import { SpinLoader } from "@/components/SpinLoader";
import { UpdateUser } from "@/features/admin/components/UpdateUser";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Admin",
};

export default async function AdminUserPage() {
  return (
    <Suspense fallback={<SpinLoader className="mb-16" />}>
      <UpdateUser />
    </Suspense>
  );
}
