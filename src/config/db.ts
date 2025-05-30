import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI: string = process.env.MONGODB_URI || "mongodb://localhost:27017/Course";

export const connectDB = async (): Promise <typeof mongoose | void> => {
    try {  
        await mongoose.connect(MONGO_URI!)
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
};