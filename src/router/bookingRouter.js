import express from 'express'
const router = express.Router()
import { bookingController } from '../controllers/index.js'
// import {protect} from '../middleware/authMiddleware.js'

router.post('/create',  bookingController.createBooking)
router.get('/', bookingController.getBookings)
router.put('/update/:id', bookingController.updateBooking)

export default router