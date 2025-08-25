import express from 'express'
const router = express.Router()
import {userDashboardController} from '../controllers/index.js'

router.get('/', userDashboardController.getUserDashboard)

export default router