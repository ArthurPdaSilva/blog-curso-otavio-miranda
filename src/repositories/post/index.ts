import { DrizzlePostRepository } from "./drizzle-post-repository";
import type { PostRepository } from "./post-repository";

export const postRepository: PostRepository = new DrizzlePostRepository();
