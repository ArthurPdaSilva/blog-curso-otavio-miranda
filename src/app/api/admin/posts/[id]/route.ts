import type { PostModel } from "@/features/post/models/post-model";
import { postRepository } from "@/features/post/repositories";
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

//DELETE /api/admin/posts/:id
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const post = await postRepository.delete((await params).id);

    return NextResponse.json({ data: post });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error ao apagar post" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const post = (await req.json()) as PostModel;

    const updatedPost = await postRepository.update(id, post);

    return NextResponse.json({ data: updatedPost }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao atualizar post" },
      { status: 500 },
    );
  }
}
