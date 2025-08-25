import express from 'express'
const router = express.Router()
import { notificationController } from '../controllers/index.js';

router.post('/create', notificationController.createNotificationController);

export default router