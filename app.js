// app.js
import express from 'express';
import cors from 'cors';

import astrologerRouter from './src/router/astrologerRouter.js';
import astrologerServiceRouter from './src/router/astrologerServiceRouter.js';
import userRouter from './src/router/authRouter.js';
import BookingRouter from './src/router/bookingRouter.js';
import KundaliRouter from './src/router/kundaliRouter.js';
import userDashboardRouter from './src/router/userDashboardRouter.js';

import './src/Queue/worker/notification.worker.js';

const app = express();

// Middlewares
app.use(cors({
  origin: ["http://localhost:5012", "http://127.0.0.1:5500"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/astrologer', astrologerRouter);
app.use('/api/v1/astrologerservice', astrologerServiceRouter);
app.use('/api/v1/booking', BookingRouter);
app.use('/api/v1/kundali', KundaliRouter);
app.use('/api/v1/user-dashboard', userDashboardRouter);

export default app;
