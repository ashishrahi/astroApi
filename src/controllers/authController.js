import { StatusCodes } from "http-status-codes";
import { authenticationService } from "../services/index.js";
//  Registration of Users
export const registerUsers = async (req, res) => {
  try {
    const model = req.body;
    const { success, message, data } =
      await authenticationService.RegisterUserService(model);
    return res.status(200).json({
      success,
      message,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};

//  List of Users

export const getUsers = async (req, res) => {
  try {
    const model = req.query;
    const { success, message, data, total, page, pages } =
      await authenticationService.UserListService(model);
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
    const model = req.body;
    const { success, message, data } =
      await authenticationService.LoginUserService(model,res);
    return res.status(200).json({ success, message, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const model = req.body;
    const { success, message, data } =
      await authenticationService.updateUserService(model, id);
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const refreshTokenHandler = async(req, res)=>{
  try {
    const model = req.cookies?.rt;
    
    const { success, message, data } =
      await authenticationService.refreshTokenHandlerService(model);
    res.status(StatusCodes.OK).json({ success, message, data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
}