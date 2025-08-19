import User from "../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../helpers/helpers.js";
import Wallet from "../models/walletModel.js";
import { createUser, getUserQuery ,findUserByEmail, UserUpdateQuery } from "../repository/userRepository.js";
import bcrypt from 'bcrypt'
import logger from "../Config/logger.js";
// RegisterUser service
export const RegisterUserService = async (model) => {
  try {
    


    const { email } = model;

    // validation
    const userExists = await findUserByEmail(email);
    if (userExists) {
      return {
        success: false,
        message: "user already exist",
      };
    }
    // create User
    const newUser = await createUser(model);
    // create wallet of User
    const newWallet =  new Wallet({ userId: newUser._id });
    newWallet.save()
    //  response of user
    return {
      success: true,
      message: "user registered successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateAccessToken(newUser._id),
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
    const {data, total, page, pages} = await getUserQuery(model);
    return {
      success: true,
      message: "user list fetch successfully",
      data:data,
      total: total,
      page: page,
      pages: pages
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};


// Login user service
export const LoginUserService = async (model, res) => {
  try {
    const { email, password } = model;
    const userfind = await User.findOne({ email });
    if (!userfind) {
      return { success: false, message: "User not found. Please register." };
    }
    console.log(userfind.status)

    if (userfind.status === false ) {
      return { success: false, message: "Your account is inactive. Please contact admin." };
    }

    const isMatch = await userfind.matchPassword(password);
    if (isMatch === false) {
      return { success: false, message: "Invalid credentials" };
    }

    // Generate tokens
    const accessToken = generateAccessToken(userfind._id);
    const refreshTokenRaw = generateRefreshToken(userfind._id);

    // Hash refresh token before saving
    const refreshTokenHash = bcrypt.hashSync(refreshTokenRaw, 12);
    userfind.refreshTokens.push({
      tokenHash: refreshTokenHash,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
    console.log("refreshTokenHash", refreshTokenHash)

    await userfind.save();

    // Set refresh token in HTTP-only cookie
    res.cookie("rt", refreshTokenRaw, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",         // HTTPS only
      sameSite: "strict",   // Prevent CSRF
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return {
      success: true,
      message: "User successfully logged in",
      data: {
        _id: userfind._id,
        name: userfind.name,
        email: userfind.email,
        role: userfind.role,
        accessToken,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

export const refreshTokenHandlerService = async (refreshTokenRaw, res) => {
  try {
    if (!refreshTokenRaw) {
      return { success: false, message: "Missing refresh token" };
    }

    // Find all users that have any active refresh token
    const users = await User.find({ "refreshTokens.0": { $exists: true } });

    let existUser = null;
    let tokenIndex = -1;

    // Compare hashed tokens
    for (const user of users) {
      const index = user.refreshTokens.findIndex(rt =>
        !rt.revokedAt && bcrypt.compareSync(refreshTokenRaw, rt.tokenHash)
      );
      if (index !== -1) {
        existUser = user;
        tokenIndex = index;
        break;
      }
    }

    if (!existUser || tokenIndex === -1) {
      return { success: false, message: "Invalid refresh token" };
    }

    const currentToken = existUser.refreshTokens[tokenIndex];

    if (currentToken.expiresAt < new Date()) {
      currentToken.revokedAt = new Date();
      currentToken.reason = "expired";
      await existUser.save();
      return { success: false, message: "Refresh token expired" };
    }

    // Rotate tokens
    const newAccessToken = generateAccessToken(existUser._id);
    const newRefreshTokenRaw = generateRefreshToken(existUser._id);
    const newRefreshTokenHash = bcrypt.hashSync(newRefreshTokenRaw, 12);

    // Revoke old token
    currentToken.revokedAt = new Date();
    currentToken.reason = "rotated";

    // Add new refresh token
    existUser.refreshTokens.push({
      tokenHash: newRefreshTokenHash,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    await existUser.save();

    // Set refresh token cookie
    res.cookie("rt", newRefreshTokenRaw, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/", // make available for all routes
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return {
      success: true,
      message: "New token generated",
      data: { accessToken: newAccessToken,
    profile: {
      _id: existUser._id,
      name: existUser.name,
      email: existUser.email,
      role: existUser.role,
    }, },
    };
  } catch (err) {
    return { success: false, message: err.message };
  }
};







export const updateUserService = async(id, model)=>{
  try {
     console.log('update', model)

      const updatedUser = await UserUpdateQuery(id, model)
      return{
        success: true,
        message: "user updated successfully",
        data: updatedUser
      }
  } catch (error) {
    throw new Error(error.message)
  }
}
