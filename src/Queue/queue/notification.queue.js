// src/Queue/queue/notification.queue.js
import { Queue } from "bullmq";
import IORedis from "ioredis";

export const connection = new IORedis({
  host: process.env.REDIS_HOST ,
  port: parseInt(process.env.REDIS_PORT) ,
  maxRetriesPerRequest: null, // Required by BullMQ
});

export const notificationQueue = new Queue("notification-queue", { connection });
