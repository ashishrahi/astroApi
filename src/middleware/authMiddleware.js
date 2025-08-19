import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; 

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(req.headers.authorization)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "your_secret_key";

    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
