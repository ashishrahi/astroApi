import express from 'express'
const router = express.Router()
import { cityController } from '../controllers/index.js'

router.post('/create', cityController.createCity)
router.get('/', cityController.getCity)

export default router;