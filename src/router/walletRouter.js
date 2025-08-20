import express from 'express'
const router = express.Router()
import { walletController } from '../controllers/index.js'

router.post('/create', walletController.createWallet )
router.get('/', walletController.getWallet)
router.put('/update/:id', walletController.updateWallet)



export default router