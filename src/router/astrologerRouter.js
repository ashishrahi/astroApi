import express from 'express'
import {astrologerController}  from '../controllers/index.js'
const router = express.Router()

router.post('/register', astrologerController.createAstrologer)
router.get('/', astrologerController.getAstrologer)
router.get('/me', astrologerController.profileAstrologer)
router.put('/me', astrologerController.updateAstrologerProfile)
router.patch('/availability', astrologerController.toggleAvailability)

export default router