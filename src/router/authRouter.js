import { authenticationController } from '../controllers/index.js'
import {protect} from '../middleware/authMiddleware.js'
import express from 'express'
const router = express.Router()
console.dir(router, { depth: 1 });

router.post('/register',authenticationController.registerUsers)
router.get('/' ,authenticationController.getUsers)
router.post('/login', authenticationController.loginUsers)
router.get('/profile', protect ,authenticationController.profileUser)
router.put('/update/:id', authenticationController.updateUser)

export default router