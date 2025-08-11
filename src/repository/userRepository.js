import User from "../models/userModel.js";

// findUserByEmail
export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

// CreateUser
export const createUser = async (model) => {
  try {
    const newUser = new User(model);
    return await newUser.save();
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};
