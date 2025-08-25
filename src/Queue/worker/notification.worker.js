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
    }).toObject();;
    const io = getIO();
    if (io) {
    io.to(userId.toString()).emit("notification", notification={
      title:notification.title,
      message: notification.message,
      type: notification.type
    });
    }
  },
  { connection }
);
