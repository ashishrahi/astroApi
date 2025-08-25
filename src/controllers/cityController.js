import { StatusCodes } from "http-status-codes";
import { cityService } from "../services/index.js";
import { cityRepository } from "../repository/cityRepository.js";

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
    const payload = req.body;
    const {success, message, data} = await cityService.getCityService(payload);
    res.status(StatusCodes.OK).json({success, message, data})
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
  }
}

// update
export const updateCity = async(req, res)=>{
  try {
        const {id } = req.params;
        const payload = req.body;
        const{success, message, data} = await cityService.updateCityService(id, payload)
        res.status(StatusCodes.OK).json({success, message, data})
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
    
  }
}