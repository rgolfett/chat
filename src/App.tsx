// src/components/Chat.tsx

import { useEffect, useState, useRef } from "react";
import { socket } from "./sockets";
import { Message, createMessage } from "./types";

interface ChatProps {
  username: string;
}

export default function Chat({ username }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const boxRef = useRef<HTMLDivElement | null>(null);

  // Autoscroll quand un nouveau message arrive
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages]);

  // Écouter les messages du serveur
  useEffect(() => {
    function handleMessage(msg: Message) {
      setMessages((prev) => [...prev, msg]);
    }

    socket.on("global-message", handleMessage);

    // Nettoyage pour éviter les doublons
    return () => {
      socket.off("global-message", handleMessage);
    };
  }, []);

  // Envoyer un message
  const sendMessage = () => {
    if (!input.trim()) return;

    const msg = createMessage(username, input.trim());
    socket.emit("global-message", msg);
    setInput(""); // vider le champ
  };

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h2>Chat global</h2>

      <div
        ref={boxRef}
        style={{
          border: "1px solid #ddd",
          height: 300,
          overflowY: "auto",
          padding: 8,
          marginBottom: 8,
          backgroundColor: "#f9f9f9",
          borderRadius: 4,
        }}
      >
        {messages.map((m) => (
          <div key={m.timestamp} style={{ marginBottom: 6 }}>
            <strong>{m.username}</strong>: {m.content}
            <div style={{ fontSize: 11, color: "#666" }}>
              {new Date(m.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ton message"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          style={{
            flex: 1,
            padding: 8,
            marginRight: 8,
            borderRadius: 4,
            border: "1px solid #c7189bff",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "8px 16px",
            borderRadius: 4,
            border: "none",
            backgroundColor: "#ff0000ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
