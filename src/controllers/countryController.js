import { StatusCodes } from "http-status-codes";
import { countryService } from "../services/index.js";


//  create country
export const createCountry = async (req, res) => {
  try {
    const payload = req.body;
    const { success, message, data } = await countryService.createCountryService(payload);
    res.status(StatusCodes.CREATED).json({ success, message, data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

//  get country
export const getCountry = async(req, res)=>{
    try {
         const payload = req.body
         const{success, message, data, total, page, totalPages} = await countryService.getCountryService(payload)
         res.status(StatusCodes.OK).json({success, message, data, total, page, totalPages})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
    }
}

// update country
export const updateCountry = async(req, res)=>{
    try {
        const payload = req.params
        const updatedData = req.body
        const{success, message, data} = await countryService.updateCountryService(payload, updatedData)
        res.status(StatusCodes.OK).json({success, message, data})
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
    }
}

// deleteCountry
export const deleteCountry = async(req, res) =>{
    try {
        const payload = req.params
        const{success, message, data} = await countryService.deleteCountryService(payload)
    } catch (error) {
        
    }
}
