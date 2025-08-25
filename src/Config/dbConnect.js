import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose'
import logger from './logger.js';

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        logger.info("Mongodb Connected")
    } catch (error) {
        logger.warn("Mongodb Error:", error.message)
        process.exit(1)
    }
}
export default dbConnect