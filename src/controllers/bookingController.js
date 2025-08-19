import {bookingServices} from '../services/index.js'
import { StatusCodes } from 'http-status-codes'

//  create booking
export const createBooking = async(req, res)=>{
    try {
        const model = req.body
        const {success, message, data} = await bookingServices.createBooking(model)
        return res.status(StatusCodes.CREATED).json({
            success,
            message,
            data
        })
    } catch (error) {
         return res.status(500).json()       
    }
}
//  get booking
export const getBookings = async(req, res)=>{
    try {
        const model = req.query;
        const {success, message, data} = await bookingServices.getBookingService(model)
        res.status(StatusCodes.OK).json({success, message, data}) 
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message: error.message})
    }
}


// updatedbooking status
export const updateBooking = async (req, res) => {
  try {
    const {id} = req.params;
    const payload = req.body;


    const { success, message, data } = await bookingServices.updateBooking(id, payload );

    return res
      .status(success ? StatusCodes.OK : StatusCodes.NOT_FOUND)
      .json({ success, message, data });
  } catch (error) {
    console.error("Error in updateBookingStatus:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};