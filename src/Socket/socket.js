// src/utilities/socket.js
import { Server } from "socket.io";

let io;

export function setupSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5012", "http://127.0.0.1:5500"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    const user = socket.handshake.query.user;
    if (user) {
      socket.join(user.toString());
      console.log(`🔌 User connected: ${user}`);
    }

    socket.on("disconnect", () => {
      console.log("❌ User disconnected");
    });
  });
}

export function getIO() {
  return io;
}
