import User from "../models/userModel.js";
import { generateToken } from "../helpers/helpers.js";
import Wallet from "../models/walletModel.js";
import { createUser, findUserByEmail } from "../repository/userRepository.js";

// RegisterUser service
export const RegisterUserService = async (model) => {
  try {
    const { email } = model;
    // validation
    const userExists = findUserByEmail(email);
    if (userExists) {
      return {
        success: false,
        message: "user already exist",
      };
    }
    // create User
    const newUser = createUser(model);
    // create wallet of User
    await createWallet({ user: newUser._id });
    //  response of user
    return {
      success: true,
      message: "user registered successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(savedUser._id),
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// UserList service
export const UserListService = async (model) => {
  try {
    const userList = await User.find();
    return {
      success: true,
      message: "user list fetch successfully",
      data: userList,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// userProfileService
export const userProfileService = async (model) => {
  try {
    const { id } = model;
    const user = await User.findById(id).select("-password");
    return {
      success: true,
      message: "profile successfully fetched",
      data: user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Login user service
export const LoginUserService = async (model) => {
  try {
    const { email, password } = model;
    const user = await User.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "User not found. Please register.",
      };
    }

    // Check if user status is false (inactive)
    if (!user.status) {
      return {
        success: false,
        message: "Your account is inactive. Please contact admin.",
      };
    }

    // Match password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    // Successful login
    return {
      success: true,
      message: "User successfully logged in",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};
