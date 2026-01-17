import { SinglePost } from "@/components/Post/SinglePost";
import { SpinLoader } from "@/components/SpinLoader";
import { findBySlugPublic } from "@/lib/queries";
import type { Metadata } from "next";
import { Suspense } from "react";

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findBySlugPublic(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function PostPage({ params }: PostSlugPageProps) {
  return (
    <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
      <SinglePost params={params} />
    </Suspense>
  );
}
