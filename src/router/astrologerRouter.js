import express from 'express'
import {astrologerController}  from '../controllers/index.js'
import {validate} from '../middleware/validateJoi.js'
import { astrologerValidationSchema } from '../validators/astrologerJoi.js'
const router = express.Router()

router.post('/register' , validate(astrologerValidationSchema), astrologerController.createAstrologer)
router.get('/',  astrologerController.getAstrologer)
router.get('/me' ,astrologerController.profileAstrologer)
router.put('/update/:id' , validate(astrologerValidationSchema), astrologerController.updateAstrologer)
router.patch('/availability' ,astrologerController.toggleAvailability)
router.delete('/delete/:id', astrologerController.deleteAstrologers )

export default router