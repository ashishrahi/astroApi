import { authenticationController } from '../controllers/index.js'
import express from 'express'
const router = express.Router()
import { validate } from '../middleware/validateJoi.js'
import { userValidationSchema } from '../validators/userJoi.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

router.post('/register',authenticationController.registerUsers)
router.get('/' ,authenticationController.getUsers)
router.post('/login' ,authenticationController.loginUsers)
router.put('/update/:id' ,authenticationController.updateUser)
router.get("/refresh", authenticationController.refreshTokenHandler);

export default router