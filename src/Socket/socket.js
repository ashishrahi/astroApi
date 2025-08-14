// src/utilities/socket.js
import { Server } from "socket.io";

let io;

export function setupSocket(server) {
   io = new Server(server, {
    cors: { origin: "*" }, // adjust for your client
  });

  io.on("connection", (socket) => {
    const {userId} = socket.handshake.query;
    if (userId) {
      socket.join(userId.toString());
      console.log(`🔌 User connected: ${userId}`);
    }

      // ✉️ Receive message and broadcast
    socket.on("send-message", (msg) => {
      const { roomId } = msg;
      if (roomId) {
        console.log('msg',msg)
        io.to(roomId).emit("receive-message", msg);
        console.log(`📨 Message sent to room ${roomId}`);
      }
    });


    socket.on("disconnect", () => {
      console.log("❌ User disconnected");
    });
  });
}

export function getIO() {
  return io;
}
