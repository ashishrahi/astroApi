import User from "../models/userModel.js";

// findUserByEmail
export const findUserByEmail = (email) =>{
    return User.findOne(email)
}

// CreateUser
export const createUser = (model)=>{
    const newUser = new User(model)
    return newUser.save()
}