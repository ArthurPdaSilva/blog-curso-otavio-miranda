import { postRepository } from "@/features/post/repositories";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await postRepository.findAllPublished();

    return NextResponse.json({ data: posts });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao buscar posts públicos" },
      { status: 500 },
    );
  }
}
