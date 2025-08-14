import { authenticationController } from '../controllers/index.js'
import express from 'express'
const router = express.Router()
import { validate } from '../middleware/validateJoi.js'
import { userValidationSchema } from '../validators/userJoi.js'

router.post('/register',validate(userValidationSchema),authenticationController.registerUsers)
router.get('/' ,authenticationController.getUsers)
router.post('/login' ,authenticationController.loginUsers)
router.put('/update/:id',validate(userValidationSchema) ,authenticationController.updateUser)
router.post("/refresh", authenticationController.refreshTokenHandler);

export default router