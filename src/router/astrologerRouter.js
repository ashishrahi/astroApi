import express from 'express'
import {astrologerController}  from '../controllers/index.js'
import {validate} from '../middleware/validateJoi.js'
import { astrologerValidationSchema } from '../validators/astrologerJoi.js'
const router = express.Router()

router.post('/register' , validate(astrologerValidationSchema), astrologerController.createAstrologer)
router.get('/',  astrologerController.getAstrologer)
router.put('/update/:id' , astrologerController.updateAstrologer)
router.delete('/delete/:id', astrologerController.deleteAstrologers )

export default router