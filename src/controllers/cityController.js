import { StatusCodes } from "http-status-codes";
import { cityService } from "../services/index.js";

// createCity
export const createCity = async (req, res) => {
  try {
    const payload = req.body;
    const { success, message, data } = await cityService.createcityService(payload);
    res.status(StatusCodes.CREATED).json({ success, message, data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

// getCity
export const getCity = async(req, res)=>{
  try {
    const payload = req.query;
    const {success, message, data} = await cityService.getCityService(payload);
    res.status(StatusCodes.OK).json({success, message, data})
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
  }
}