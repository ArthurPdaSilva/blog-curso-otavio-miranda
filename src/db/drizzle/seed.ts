import { JsonPostRepository } from "@/features/post/repositories/json-post-repository";
import { drizzleDb } from ".";
import { postsTable } from "./schema";

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();
  try {
    await drizzleDb.delete(postsTable); // Limpa a tabela antes de inserir novos dados (PERIGOSO)
    await drizzleDb.insert(postsTable).values(posts);
  } catch (error) {
    console.error("Erro ao inserir posts na base de dados:", error);
  }
})();
