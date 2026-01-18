import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { resolve } from "node:path";
import { postsTable } from "./schema";

/*
  Notas Drizzle:
  - Comandos úteis: `npx drizzle-kit push`, `npx drizzle-kit generate`, `npx drizzle-kit migrate`.
  - O arquivo `src/db/seed/posts.json` é usado como seed; ao ler JSON em produção,
    prefira usar Node/fs e verificar caching do Next.
*/

const sqliteDatabasePath = resolve(process.cwd(), "db.sqlite3");
const sqliteDatabase = new Database(sqliteDatabasePath);

export const drizzleDb = drizzle(sqliteDatabase, {
  schema: {
    posts: postsTable,
  },
  logger: true,
});
