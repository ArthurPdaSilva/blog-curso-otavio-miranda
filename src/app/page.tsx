import { PostFeatured } from "@/components/Post/PostFeatured";
import { PostsList } from "@/components/Post/PostsList";
import { SpinLoader } from "@/components/SpinLoader";
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
