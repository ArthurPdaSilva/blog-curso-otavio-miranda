/** biome-ignore-all assist/source/organizeImports: false positive */
import type { PostModel } from "@/models/post/post-model";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { PostRepository } from "./post-repository";

export class JsonPostRepository implements PostRepository {
  async delete(_: string): Promise<PostModel> {
    throw new Error("Method not implemented.");
  }
  private async readFromDisk(): Promise<PostModel[]> {
    const ROOT_DIR = process.cwd();
    const JSON_POSTS_FILE_PATH = resolve(
      ROOT_DIR,
      "src",
      "db",
      "seed",
      "posts.json",
    );
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, "utf-8");
    const parsedJson = JSON.parse(jsonContent);
    const { posts } = parsedJson;
    return posts;
  }

  async findAll(): Promise<PostModel[]> {
    console.log("[JsonPostRepository] findAll");
    const posts = await this.readFromDisk();
    return posts;
  }

  async findAllPublished(): Promise<PostModel[]> {
    console.log("[JsonPostRepository] findAllPublished");
    const posts = await this.readFromDisk();

    return posts.filter((post) => post.published);
  }

  async findById(id: string): Promise<PostModel> {
    console.log("[JsonPostRepository] findById");
    const posts = await this.findAllPublished();
    const post = posts.find((post) => post.id === id) || null;

    if (!post) throw new Error("Post não encontrado para ID fornecido");
    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    console.log("[JsonPostRepository] findBySlugPublic");
    const posts = await this.findAllPublished();
    const post =
      posts.find((post) => post.slug === slug || post.published) || null;

    if (!post) throw new Error("Post não encontrado para slug fornecido");
    return post;
  }
}
