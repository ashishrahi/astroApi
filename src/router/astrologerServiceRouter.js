import express from 'express'
const router = express.Router()
import {astrologerServiceController} from '../controllers/index.js'

router.post('/create',astrologerServiceController.createAstrologerServices)
router.get('/',astrologerServiceController.getAstrologerServices)
router.put('/:id',astrologerServiceController.updatedAstrologerServices)
router.delete('/:id',astrologerServiceController.deletedAstrologerServices)

export default router
