/** biome-ignore-all assist/source/organizeImports: false positive */
import { drizzleDb } from "@/db/drizzle";
import { postTable } from "@/db/drizzle/schema";
import type { PostModel } from "@/models/post/post-model";
import { logColor } from "@/utils/log-color";
import { and, desc, eq } from "drizzle-orm";
import type { PostRepository } from "./post-repository";

export class DrizzlePostRepository implements PostRepository {
  async delete(id: string): Promise<PostModel> {
    logColor("[DrizzlePostRepository] delete");
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error("Post não existe");
    }

    await drizzleDb.delete(postTable).where(eq(postTable.id, id));

    return post;
  }

  async findAllPublished(): Promise<PostModel[]> {
    // await asyncDelay(5000, true);
    logColor("[DrizzlePostRepository] findAllPublished");
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: desc(postTable.createdAt),
      where: eq(postTable.published, true),
    });
    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    // await asyncDelay(5000, true);
    logColor("[DrizzlePostRepository] findBySlugPublic");
    const post = await drizzleDb.query.posts.findFirst({
      where: and(eq(postTable.slug, slug), eq(postTable.published, true)),
    });
    if (!post) throw new Error("Post não encontrado para slug fornecido");
    return post;
  }

  async findAll(): Promise<PostModel[]> {
    // await asyncDelay(5000, true);
    logColor("[DrizzlePostRepository] findAll");
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: desc(postTable.createdAt),
    });
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    // await asyncDelay(5000, true);
    logColor("[DrizzlePostRepository] findById");
    const post = await drizzleDb.query.posts.findFirst({
      where: eq(postTable.id, id),
    });
    if (!post) throw new Error("Post não encontrado para ID fornecido");
    return post;
  }
}
