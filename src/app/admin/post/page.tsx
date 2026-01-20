import { SpinLoader } from "@/components/SpinLoader";
import { PostListAdmin } from "@/features/admin/components/PostListAdmin";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Postes Admin",
  description: "Página de administração de postes",
};

export const dynamic = "force-dynamic";

export default function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
      <PostListAdmin />
    </Suspense>
  );
}
