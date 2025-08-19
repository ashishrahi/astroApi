import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookiing"
    },
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    astrologerId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Astrologer"
    },
    rating: {
        type: String
    },
    comment:{
        type: String,
    },
})
const Review = mongoose.model("Review", reviewSchema)

export default Review