import { authenticationController } from '../controllers/index.js'
import {protect} from '../middleware/authMiddleware.js'
import { validate } from '../middleware/validateJoi.js'
import {userValidationSchema} from '../validators/userJoi.js'
import express from 'express'
const router = express.Router()

router.post('/register', validate(userValidationSchema) ,authenticationController.registerUsers)
router.get('/' ,authenticationController.getUsers)
router.post('/login', validate(userValidationSchema) ,authenticationController.loginUsers)
router.get('/profile', protect ,authenticationController.profileUser)

export default router