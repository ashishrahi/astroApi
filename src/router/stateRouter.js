import express from 'express'
const router = express.Router()
import { stateController } from '../controllers/index.js'
import { validate } from '../middleware/validateJoi.js'
import { stateValidationSchema } from '../validators/stateJoi.js'


router.post('/create',validate(stateValidationSchema) ,stateController.createState)
router.get('/', stateController.getStates)
router.put('/update/:id', stateController.updatedState)
router.delete('/delete/:id', stateController.deleteStates)

export default router