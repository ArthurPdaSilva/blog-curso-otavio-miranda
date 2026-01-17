import { ExemploContent } from "@/components/ExemploContent";
import { SpinLoader } from "@/components/SpinLoader";
import { Suspense } from "react";

export default function ExemploDynamicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="min-h-150 text-4xl font-bold">
      <Suspense fallback={<SpinLoader className="min-h-20" />}>
        <ExemploContent params={params} />
      </Suspense>
    </main>
  );
}
