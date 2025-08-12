import express from 'express'
import {astrologerController}  from '../controllers/index.js'
import {validate} from '../middleware/validateJoi.js'
import { astrologerValidationSchema } from '../validators/astrologerJoi.js'
const router = express.Router()

router.post('/register' ,astrologerController.createAstrologer)
router.get('/',  astrologerController.getAstrologer)
router.get('/me' ,astrologerController.profileAstrologer)
router.put('/update/:id' ,astrologerController.updateAstrologerProfile)
router.patch('/availability' ,astrologerController.toggleAvailability)

export default router