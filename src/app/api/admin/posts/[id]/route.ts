import { postRepository } from "@/repositories/post";
import { NextResponse } from "next/server";

// GET /api/admin/posts/:id
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const post = await postRepository.findById((await params).id);

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
