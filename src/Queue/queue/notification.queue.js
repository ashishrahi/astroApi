// src/Queue/queue/notification.queue.js
import { Queue } from "bullmq";
import IORedis from "ioredis";
import dotenv from 'dotenv';
import logger from "../../Config/logger.js";
dotenv.config();


export const connection = new IORedis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null,
});
logger.info('REDIS_HOST:', process.env.REDIS_HOST)
logger.info('REDIS_PORT:', process.env.REDIS_PORT); // should be '6379'


export const notificationQueue = new Queue("notification-queue", { connection });
