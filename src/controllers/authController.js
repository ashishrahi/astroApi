import { StatusCodes } from "http-status-codes";
import { authenticationService } from "../services/index.js";
//  Registration of Users
export const registerUsers = async (req, res) => {
  try {
    const payload = req.body;
    const { success, message, data } =
      await authenticationService.RegisterUserService(payload);
    return res.status(StatusCodes.CREATED).json({
      success,
      message,
      data,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
  }
};

//  List of Users

export const getUsers = async (req, res) => {
  try {
    const payload = req.query;
    const { success, message, data, total, page, pages } =
      await authenticationService.UserListService(payload);
    return res
      .status(StatusCodes.OK)
      .json({ success, message, data, total, page, pages });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

// LOGIN OF USERS

export const loginUsers = async (req, res) => {
  try {
    const payload = req.body;
    const { success, message, data } =
      await authenticationService.LoginUserService(payload,res);
    return res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { success, message, data } =
      await authenticationService.updateUserService(id, payload);
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const refreshTokenHandler = async(req, res)=>{
  try {
    const payload = req.cookies?.rt;
    
    const { success, message, data } =
      await authenticationService.refreshTokenHandlerService(payload, res);
    res.status(StatusCodes.OK).json({ success, message, data});
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
}