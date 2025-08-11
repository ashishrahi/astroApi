import User from "../models/userModel.js";

// findUserByEmail
export const findUserByEmail = async(email) =>{
    return await User.findOne(email)
}

// CreateUser
export const createUser = async(model)=>{
    try {
    const newUser = new User(model);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error; 
  }
}