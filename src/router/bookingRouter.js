import express from 'express'
const router = express.Router()
import { bookingController } from '../controllers/index.js'
// import {protect} from '../middleware/authMiddleware.js'

router.post('/create',  bookingController.createBooking)
router.get('/', bookingController.getBookings)
router.get('/astrologer/:id',  bookingController.getAstrologerBookings)
router.put('/update/:id', bookingController.updateBookingStatus)

export default router