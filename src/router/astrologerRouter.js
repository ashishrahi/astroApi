import express from 'express'
import {astrologerController}  from '../controllers/index.js'
import {validate} from '../middleware/validateJoi.js'
import { astrologerValidationSchema } from '../validators/astrologerJoi.js'
const router = express.Router()

router.post('/register', validate(astrologerValidationSchema) ,astrologerController.createAstrologer)
router.get('/', validate(astrologerValidationSchema) ,astrologerController.getAstrologer)
router.get('/me', validate(astrologerValidationSchema) ,astrologerController.profileAstrologer)
router.put('/me', validate(astrologerValidationSchema) ,astrologerController.updateAstrologerProfile)
router.patch('/availability', validate(astrologerValidationSchema) ,astrologerController.toggleAvailability)

export default router