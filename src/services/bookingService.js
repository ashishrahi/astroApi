import Booking from "../models/bookingModel.js"

export const createBooking = async(model)=>{
try {
    const booking = new Booking({...model})
    await booking.save()
    return{
        success: true,
        message: "booking created successfully",
        data: booking
    }
   
} catch (error) {
    return{
        success: false,
        message: error.message
    }
}
}
export const getUserBookings = (model) =>{
    try {
        const model = req.params
    } catch (error) {
        
    }

}
 
export const getAstrologerBookings = async(model)=>{
    try {
        const {id} = model
        const bookings = await Booking.find({astrologer:id}).populate([ 
            { path: "user", select: "name email" },
            { path: "astrologer", select: "name rating" }])

        return{
            success: true,
            message: 'astrologer bookings',
            data: bookings
              }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }

}

export const updateBookingStatus = async(model)=>{
    try {
        const {id} = model
        const booking = await Booking.findById(id)
        if (!booking) {
            return{
                success: false,
                message: "booking is not found"
            }}
            booking.status = model.status || booking.status,
            booking.paymentStatus = model.paymentStatus || booking.paymentStatus
            await booking.save();
            return{
                success: true,
                message: 'status updated successfully'
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
    }

}