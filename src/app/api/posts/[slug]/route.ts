import { postRepository } from "@/features/post/repositories";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const post = await postRepository.findBySlugPublic((await params).slug);

    if (!post) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: post });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao buscar post" }, { status: 500 });
  }
}
