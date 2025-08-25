// src/utilities/socket.js
import { Server } from "socket.io";
import logger from "../Config/logger.js";

let io;

export function setupSocket(server) {
   io = new Server(server, {
    cors: { origin: "*" }, // adjust for your client
  });

  io.on("connection", (socket) => {
    const {userId} = socket.handshake.query;
    if (userId) {
      socket.join(userId.toString());
      logger.info(`🔌 User connected: ${userId}`);
    }

      // ✉️ Receive message and broadcast
    socket.on("send-message", (msg) => {
      const { roomId } = msg;
      if (roomId) {
        io.to(roomId).emit("receive-message", msg);
        logger.info(`📨 Message sent to room ${roomId}`);
      }
    });

      // 🔔 Send test notification to user after connect (for debugging)
    if (userId) {
      io.to(userId.toString()).emit("notification", {
        title: "Welcome!",
        message: `Hello, Have a great day`,
      });
    }

    socket.on("disconnect", () => {
      logger.info("❌ User disconnected");
    });
  });
}

export function getIO() {
  return io;
}
