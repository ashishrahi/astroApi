import express from 'express'
const router = express.Router()
import { reviewController } from '../controllers/index.js'

router.post('/create', reviewController.createReview)
router.get('/list', reviewController.getReviewList)

export default router