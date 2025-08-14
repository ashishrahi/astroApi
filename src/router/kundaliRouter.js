import express from 'express'
const router = express.Router()
import { kundaliController } from '../controllers/index.js'

router.post('/generate', kundaliController.generateKundli)
router.get('/', kundaliController.getUserKundlis)

export default router
