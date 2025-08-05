import express from 'express'
const router = express.Router()
import {astrologerServiceController} from '../controllers/index.js'
import { validate } from '../middleware/validateJoi.js'
import {astrologerServiceValidationSchema} from '../validators/astrologerServiceJoi.js'

// validate router
router.post('/create', validate(astrologerServiceValidationSchema) ,astrologerServiceController.createAstrologerServices)
router.get('/', astrologerServiceController.getAstrologerServices)
router.put('/:id', validate(astrologerServiceValidationSchema) ,astrologerServiceController.updatedAstrologerServices)
router.delete('/:id', validate(astrologerServiceValidationSchema) ,astrologerServiceController.deletedAstrologerServices)

export default router
