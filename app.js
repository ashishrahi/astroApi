import express from 'express'
import cors from 'cors'
const app = express()
import astrologerRouter from './src/router/astrologerRouter.js'
import astrologerServiceRouter from './src/router/astrologerServiceRouter.js'
import userRouter from './src/router/authRouter.js'
import BookingRouter from './src/router/bookingRouter.js'
import KundaliRouter from './src/router/kundaliRouter.js'

// middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/users', userRouter)
app.use('/api/v1/astrologer',astrologerRouter)
app.use('/api/v1/astrologerservice', astrologerServiceRouter)
app.use('/api/v1/booking', BookingRouter)
app.use('/api/v1/kundali', KundaliRouter)



export default app