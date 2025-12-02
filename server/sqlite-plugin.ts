import fp from "fastify-plugin";
import Database from "better-sqlite3";

export default fp(async (fastify, opts) => {
  const db = new Database(opts.filename || "chat.sqlite");
  fastify.decorate("db", db);

  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      username TEXT,
      content TEXT,
      timestamp INTEGER
    );
  `);
});
