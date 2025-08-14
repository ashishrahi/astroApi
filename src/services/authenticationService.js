import User from "../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../helpers/helpers.js";
import Wallet from "../models/walletModel.js";
import { createUser, getUserQuery ,findUserByEmail, UserUpdateQuery } from "../repository/userRepository.js";
import bcrypt from 'bcrypt'
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
console.log(userfind)
    if (!userfind) {
      return { success: false, message: "User not found. Please register." };
    }

    if (!userfind.status) {
      return { success: false, message: "Your account is inactive. Please contact admin." };
    }

    const isMatch = await userfind.matchPassword(password);
    if (!isMatch) {
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

    await userfind.save();

    // Set refresh token in HTTP-only cookie
    res.cookie("rt", refreshTokenRaw, {
      httpOnly: true,
      secure: true,         // HTTPS only
      sameSite: "strict",   // Prevent CSRF
      path: "/auth/refresh",
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

export const refreshTokenHandlerService = async (model) => {
  try {
    const refreshTokenRaw = model
    if (!refreshTokenRaw) {
      return { success: false, message: "Missing refresh token" };
    }

    // Find user by refresh token hash
    const user = await User.findOne({ "refreshTokens.revokedAt": { $exists: false } });
    console.log('user:', user)

    if (!user) {
      return { success: false, message: "Invalid refresh token" }
    }

    const tokenIndex = user.refreshTokens.findIndex(rt =>
      !rt.revokedAt && bcrypt.compareSync(refreshTokenRaw, rt.tokenHash)
    );

    if (tokenIndex === -1) {
      // Token reuse detected — revoke all
      user.refreshTokens.forEach(t => { t.revokedAt = new Date(); t.reason = "suspected-reuse"; });
      await user.save();
      return { success: false, message: "Token reuse detected" }
    }

    const currentToken = user.refreshTokens[tokenIndex];
    if (currentToken.expiresAt < new Date()) {
      currentToken.revokedAt = new Date();
      currentToken.reason = "expired";
      await user.save();
      return { success: false, message: "Refresh token expired" }
    }

    // Rotate token
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshTokenRaw = generateRefreshToken(user._id);
    const newRefreshTokenHash = bcrypt.hashSync(newRefreshTokenRaw, 12);

    currentToken.revokedAt = new Date();
    currentToken.reason = "rotated";

    user.refreshTokens.push({ tokenHash: newRefreshTokenHash, expiresAt: new Date(Date.now() + 30*24*60*60*1000) });
    await user.save();

    res.cookie("rt", newRefreshTokenRaw, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/auth/refresh",
      maxAge: 30*24*60*60*1000,
    });

    return { success: true, accessToken: newAccessToken }
  } catch (err) {
    return { success: false, message: err.message }
  }
};






export const updateUserService = async(model, id)=>{
  try {

      const updatedUser = await UserUpdateQuery(model, id)
      return{
        success: true,
        message: "user updated successfully",
        data: updatedUser
      }
  } catch (error) {
    throw new Error(error.message)
  }
}
