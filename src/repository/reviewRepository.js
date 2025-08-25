import Review from '../models/reviewModel.js'
import { reviewPipeline } from '../Pipeline/reviewPipeline.js'


export const reviewRepository = {
    // create Review
    createReview: async(payload)=>{
        const newReview = new Review(payload)
        const savedReview = newReview.save()
        return savedReview;
    },
    // find Review
    getReview: async(payload)=>{
        const result = Review.aggregate(reviewPipeline(payload))
        return result;
    },
    // update Review
    updateReview: async(id, payload)=>{
        const updatedReview = await Review.findByIdAndUpdate(id, payload)
        return updatedReview
    }
}


