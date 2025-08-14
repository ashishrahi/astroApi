import express from 'express'
const router = express.Router()
import {astrologerServiceController} from '../controllers/index.js'
import { validate } from '../middleware/validateJoi.js'
import {astrologerServiceValidationSchema} from "../validators/astrologerServiceJoi.js"

// validate router
router.post('/create',validate(astrologerServiceValidationSchema) ,astrologerServiceController.createAstrologerServicesList)
router.get('/',validate(astrologerServiceValidationSchema) ,astrologerServiceController.getAstrologerServicesList)
router.put('/update/:id',validate(astrologerServiceValidationSchema) ,astrologerServiceController.updatedAstrologerServicesList)
router.delete('/delete/:id', astrologerServiceController.deletedAstrologerServicesList)

export default router
