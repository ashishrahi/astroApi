import express from 'express';
import cors from 'cors';
import astrologerRouter from './src/router/astrologerRouter.js';
import astrologerServiceRouter from './src/router/astrologerServiceRouter.js';
import userRouter from './src/router/authRouter.js';
import BookingRouter from './src/router/bookingRouter.js';
import KundaliRouter from './src/router/kundaliRouter.js';
import userDashboardRouter from './src/router/userDashboardRouter.js';
import logger from './src/Config/logger.js'
import './src/Queue/worker/notification.worker.js';
import { StatusCodes } from 'http-status-codes';
const app = express();
import morgan from "morgan";
import helmet from 'helmet';

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:5012",
    "http://127.0.0.1:5500",
    "https://client-astro-44k5.vercel.app",
    "http://localhost:5174"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(helmet({
    contentSecurityPolicy: true,
    crossOriginEmbedderPolicy: false,
  }));
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  })
);
app.use(morgan("dev"));
app.use((err, req, res, next)=>{
  logger.error(err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error:"Internal Server Error"
  })
})


// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/astrologer', astrologerRouter);
app.use('/api/v1/astrologerservice', astrologerServiceRouter);
app.use('/api/v1/booking', BookingRouter);
app.use('/api/v1/kundali', KundaliRouter);
app.use('/api/v1/user-dashboard', userDashboardRouter);

export default app;
