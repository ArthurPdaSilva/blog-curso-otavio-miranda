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
