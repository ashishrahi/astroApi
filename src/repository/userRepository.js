import User from "../models/userModel.js";

// findUserByEmail
export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(error.message)
  }
};

// user list
export const getUserQuery = async (model) => {
  try {
    const { page = 1, limit = 5 } = model; 
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const userlist = await User.find()
      .skip(skip)
      .limit(limitNumber)
      .exec();
    const total = await User.countDocuments();

    return {
      data :userlist,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
    };
  } catch (error) {
    throw new Error(error.message);
  }
};


// create user
export const createUser = async (model) => {
  try {
    if (model.length > 0) {
      throw new Error("user should not null")
    }
    const newUser = new User(model);
    return await newUser.save();
  } catch (error) {
    throw new Error(`User created failed ${error.message}`)
  }
};
// update user
export const UserUpdateQuery = async (model, id) => {
  try {
    if (!id) {
      throw new Error("userid is required for update");
    }
    return await User.findByIdAndUpdate(id, model, { new: true });
  } catch (error) {
    throw new Error(`User updated failed: ${error.message}`);
  }
};
