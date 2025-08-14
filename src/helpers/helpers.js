import jwt from 'jsonwebtoken';
console.log(jwt)

export const generateToken = (userId)=>{
    return jwt.sign({id: userId}, process.env.JWT_KEY, {
        expiresIn: '30d'
    })}

