

// export type Message = {
// id: string;
// author: string;
// text: string;
// time: number;
// };


// export type User = {
//   id: string;
//   name: string;
// };

// src/components/Chat.tsx

import { useEffect, useState } from "react";
import { socket } from "./sockets";
import { Message } from "./types";

interface ChatProps {
  username: string;
}
function Chat({ username }: ChatProps) {}


// export default function Chat({ username }: ChatProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");

//   // Quand on reçoit un message du serveur
//   useEffect(() => {
//     function handleMessage(msg: Message) {
//       setMessages((prev) => [...prev, msg]);
//     }

//     socket.on("global-message", handleMessage);

//     // Nettoyage
//     return () => {
//       socket.off("global-message", handleMessage);
//     };
//   }, []);

//   // Envoyer un message
//   function sendMessage() {
//     if (!input.trim()) return;

//     const message: Message = {
//       username,
//       content: input,
//       timestamp: Date.now(),
//     };

//     socket.emit("global-message", message);
//     setInput("");
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Chat global</h2>
//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: 10,
//           height: 300,
//           overflowY: "auto",
//           marginBottom: 10,
//         }}
//       >
//         {messages.map((msg, i) => (
//           <div key={i}>
//             <strong>{msg.username}:</strong> {msg.content}
//           </div>
//         ))}
//       </div>

//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         style={{ marginRight: 10 }}
//       />
//       <button onClick={sendMessage}>Envoyer</button>
//     </div>
//   );
// }
