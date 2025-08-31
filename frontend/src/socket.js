// socket.js
import { io } from "socket.io-client";

// Create a single socket instance (singleton)
const socket = io("https://multiuseraichatbot.onrender.com", {
  autoConnect: false,        // Don't connect immediately
  withCredentials: true,     // 👈 allows cookies (JWT/session) to be sent
  transports: ["websocket"], // Prefer WebSocket over polling
});

export default socket;
