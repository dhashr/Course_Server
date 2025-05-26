import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

<<<<<<< HEAD
const MONGO_URI: string = process.env.MONGODB_URI || "mongodb://localhost:27017/Certification";
=======
const MONGO_URI: string = process.env.MONGODB_URI || "mongodb://localhost:27017/Course";
>>>>>>> c021dc9f8e24044e5b6fd8e741c21631df2fc34d

export const connectDB = async (): Promise <typeof mongoose | void> => {
    try {  
        await mongoose.connect(MONGO_URI!)
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
};