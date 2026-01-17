import { eq } from "drizzle-orm";
import { drizzleDb } from ".";
import { postTable } from "./schema";

(async () => {
  const posts = await drizzleDb.select().from(postTable);

  posts.forEach((post) => {
    console.log(post.slug);
  });
  await drizzleDb
    .update(postTable)
    .set({
      title: "Veja agora a rotina matinal de pessoas altamente eficazes",
      published: true,
    })
    .where(eq(postTable.slug, "rotina-matinal-de-pessoas-altamente-eficazes"));
})();
