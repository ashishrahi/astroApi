import express from 'express';
import cors from 'cors';
import astrologerRouter from './src/router/astrologerRouter.js';
import astrologerServiceRouter from './src/router/astrologerServiceRouter.js';
import userRouter from './src/router/authRouter.js';
import BookingRouter from './src/router/bookingRouter.js';
import KundaliRouter from './src/router/kundaliRouter.js';
import userDashboardRouter from './src/router/userDashboardRouter.js';
import logger from './src/Config/logger.js'
import countryRouter from './src/router/countryRouter.js'
import stateRouter from './src/router/stateRouter.js'
import cityRouter from './src/router/cityRouter.js'
import reviewRouter from './src/router/reviewRouter.js'
import './src/Queue/worker/notification.worker.js';
import { StatusCodes } from 'http-status-codes';
const app = express();
import morgan from "morgan";
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
// Middlewares
app.use(cors({
  origin: [
    "http://localhost:5013",
    "http://localhost:5012",

    "http://127.0.0.1:5500",
    "https://astroapi-1.onrender.com",
    "http://localhost:5174",
     "https://client-astro-bc8f.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
    error:err.message
  })
})


// Routes
app.use('/api/v1/user-dashboard' ,userDashboardRouter);
app.use('/api/v1/countries' ,countryRouter)
app.use('/api/v1/states' ,stateRouter)
app.use('/api/v1/cities' ,cityRouter)
app.use('/api/v1/users' ,userRouter);
app.use('/api/v1/astrologers' ,astrologerRouter);
app.use('/api/v1/services' ,astrologerServiceRouter);
app.use('/api/v1/bookings' ,BookingRouter);
app.use('/api/v1/kundalis' ,KundaliRouter);
app.use('/api/v1/reviews', reviewRouter)


export default app;
