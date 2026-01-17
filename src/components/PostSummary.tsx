import { PostDate } from "./PostDate";
import { PostHeading } from "./PostHeading";

/*
  Notas de props:
  - Evite passar objetos sensíveis completos para componentes que podem virar Client Components.
  - Em vez de `post={post}` prefira passar apenas os campos necessários: `{ title, createdAt, excerpt }`.
*/

type PostSummaryProps = {
  postHeading: "h1" | "h2";
  postLink: string;
  post: {
    title: string;
    excerpt: string;
    createdAt: string;
  };
};

export async function PostSummary({
  postHeading,
  postLink,
  post,
}: PostSummaryProps) {
  return (
    <div className="flex flex-col gap-4 sm:justify-center">
      <PostDate dateTime={post.createdAt} />

      <PostHeading as={postHeading} href={postLink}>
        {post.title}
      </PostHeading>

      <p>{post.excerpt}</p>
    </div>
  );
}
