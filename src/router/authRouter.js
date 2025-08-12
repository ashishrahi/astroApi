import { authenticationController } from '../controllers/index.js'
import {protect} from '../middleware/authMiddleware.js'
import express from 'express'
const router = express.Router()

router.post('/register',authenticationController.registerUsers)
router.get('/' ,authenticationController.getUsers)
router.post('/login', authenticationController.loginUsers)
router.get('/profile', protect ,authenticationController.profileUser)
router.put('/update/:id', authenticationController.updateUser)

export default router