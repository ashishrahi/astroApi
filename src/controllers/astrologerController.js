import { StatusCodes } from "http-status-codes";
import { astrologerService } from "../services/index.js";

export const createAstrologer = async (req, res) => {
  try {
    const payload = req.body;

    const { success, message, data } =
      await astrologerService.createAstrologerService(payload);
    return res.status(StatusCodes.CREATED).json({
      success,
      message,
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAstrologer = async (req, res) => {
  try {
    const payload = req.query;
    const { success, message, data } =
      await astrologerService.getAstrologerService(payload);
    return res.status(StatusCodes.OK).json({
      success,
      message,
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success,
      message,
    });
  }
};



export const updateAstrologer = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const { success, message, data } =
      await astrologerService.updateAstrologerService(id, payload);
    res.status(StatusCodes.CREATED).json({
      success,
      message,
      data,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteAstrologers = async( req, res)=>{
  try {
    const {id} = req.params;
    const {success, message, data}= await astrologerService.deleteService(id)
    res.status(StatusCodes.OK).json({success, message, data})

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
  }
}
