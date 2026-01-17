import { JsonPostRepository } from "@/repositories/post/json-post-repository";
import { drizzleDb } from ".";
import { postTable } from "./schema";

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();
  try {
    await drizzleDb.delete(postTable); // Limpa a tabela antes de inserir novos dados (PERIGOSO)
    await drizzleDb.insert(postTable).values(posts);
  } catch (error) {
    console.error("Erro ao inserir posts na base de dados:", error);
  }
})();
