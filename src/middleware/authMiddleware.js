import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = async(req, res, next)=>{
      let token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({message: "not authorized"})
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        req.user = await User.findById(decoded.id).select('-password')

        next()
      } catch (error) {
        res.status(401).json({message: 'token failed'})
      }
}