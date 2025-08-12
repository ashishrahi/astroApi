import Booking from "../models/bookingModel.js"

export const BookingListQuery = async(model) => {
    try {
        const{page , limit} = model
        const pageNumber = parseInt(page, 10)
        const limitNumber = parseInt(limit, 10)
        const skip = (pageNumber - 1) * limitNumber
        const bookingList = await Booking.find().skip(skip).limit(limitNumber)
        return bookingList
    } catch (error) {
        throw new Error(error.message)
    }
}