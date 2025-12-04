
// import { io } from "socket.io-client";

// const URL = "http://localhost:3000";


// export const socket = io(URL, {
//   autoConnect: true,
// });

// src/socket.ts

import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";
export const socket = io(URL, {
  autoConnect: true,
});

