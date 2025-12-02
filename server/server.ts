import Fastify from "fastify";
import { createServer } from "http";
import { Server as IOServer } from "socket.io";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import path from "path";
import Database from "better-sqlite3";


const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
});

await fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/",
});


const db = new Database("chat.db");
db.prepare(
  `CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    username TEXT,
    content TEXT,
    timestamp INTEGER
  )`
).run();

fastify.get("/messages", async (req, res) => {
  const rows = db.prepare("SELECT * FROM messages ORDER BY timestamp ASC").all();
  return rows;
});


const httpServer = createServer(fastify);
const io = new IOServer(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
});


const events = io.of("/events");

events.on("connection", (socket) => {
  console.log("Socket connecté:", socket.id);

  socket.on("identify", (data) => {
    console.log("Identification:", data);
  });

  socket.on("global-message", (payload) => {
    console.log("Message reçu:", payload);

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const msg = { id, ...payload };

    db.prepare(
      "INSERT INTO messages (id, username, content, timestamp) VALUES (?, ?, ?, ?)"
    ).run(msg.id, msg.username, msg.content, msg.timestamp);

    events.emit("global-message", msg);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket déconnecté:", reason);
  });
});


const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server & socket.io listening on http://localhost:${PORT}`);
});
