import express from 'express'
const router = express.Router()
import { cityController } from '../controllers/index.js'

router.post('/create', cityController.createCity)
router.get('/', cityController.getCity)
router.put('/update/:id', cityController.updateCity)

export default router;