import Review from '../models/reviewModel.js'
import { reviewPipeline } from '../Pipeline/reviewPipeline.js'

export const reviewCreateQuery = async(payload) =>{
    try {
        const newReview = new Review(payload)
        const savedReview = newReview.save()
        return savedReview
    } catch (error) {
        throw new Error(error.message)
        
    }
}

export const reviewGetQuery = async(payload) =>{
    try {
        const result = await reviewPipeline(payload)
        return result
    } catch (error) {
        throw new Error(error.message)
    }
}