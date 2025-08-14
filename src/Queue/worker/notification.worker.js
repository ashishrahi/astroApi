// src/Queue/worker/notification.worker.js
import { Worker } from "bullmq";
import { connection } from "../queue/notification.queue.js";
import { Notification } from "../../models/notificationModel.js";
import { getIO } from "../../Socket/socket.js";

export const notificationWorker = new Worker(
  "notification-queue",
  async (job) => {

    const { userId, title, message, type } = job.data;

    const notification = await Notification.create({
      userId,
      title,
      message,
      type,
    });
    const io = getIO();
    if (io) {
      io.to(userId).emit("notification", 
      notification
      );
    }
  },
  { connection }
);
