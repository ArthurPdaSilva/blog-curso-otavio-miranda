import { SpinLoader } from "@/components/SpinLoader";
import { PostFeatured } from "@/features/post/components/PostFeatured";
import { PostsList } from "@/features/post/components/PostsList";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PostFeatured />
      <PostsList />
    </Suspense>
  );
}
