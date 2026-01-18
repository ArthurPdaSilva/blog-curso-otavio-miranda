import { PostModel } from "@/models/post/post-model";
import { postRepository } from "@/repositories/post";
import { NextResponse } from "next/server";

// GET /api/admin/posts
export async function GET() {
  try {
    const posts = await postRepository.findAll();
    return NextResponse.json({ data: posts });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao buscar posts" },
      { status: 500 },
    );
  }
}

//POST /api/admin/posts/
export async function POST(req: Request) {
  try {
    const postModel = (await req.json()) as PostModel;
    const post = await postRepository.create(postModel);

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao criar post" }, { status: 500 });
  }
}
