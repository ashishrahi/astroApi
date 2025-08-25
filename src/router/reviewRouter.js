import express from 'express'
const router = express.Router()
import { reviewController } from '../controllers/index.js'

router.post('/create', reviewController.createReview)
router.get('/', reviewController.getReviewList)

export default router