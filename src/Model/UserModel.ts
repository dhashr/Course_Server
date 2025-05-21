import mongoose, { Schema, Document } from "mongoose";
import { IUser, UserRole } from '../types';

const UserSchema = new Schema<IUser>({
    email: {
        type: String, require: true, unique: true, lowercase: true, trim: true
    },
    username: { type: String, require: true, },
    password: { type: String, require: true, },
    role: { type: String, enum: Object.values(UserRole) },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date },
    updatedAt: { type: Date, default: null }
});

const User = mongoose.model<IUser>('user', UserSchema);
export { User, IUser };