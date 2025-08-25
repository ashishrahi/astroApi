// src/services/notification.service.js
import { notificationQueue } from "../Queue/queue/notification.queue.js";

export async function notifyUser(payload) {

  await notificationQueue.add("send-notification", payload);
}

export const createNotificationService =()=>{
  
}
