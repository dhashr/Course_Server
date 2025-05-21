import mongoose, { Schema } from "mongoose";
import { ILoginHistory } from "../types";

const loginHistorySchema = new Schema<ILoginHistory>({
    userId: { type: Schema.Types.ObjectId, required: true },
    role: { type: String, default: '' },
    origin: { type: String, default: '' },
    ip: { type: String, default: '' },
    location: { type: String },
    userAgent: { type: String, default: '' },
    cretedAt: { type: Date, default: Date.now }
});

const LoginHistory = mongoose.model<ILoginHistory>('loginhistory', loginHistorySchema);
export { LoginHistory, ILoginHistory };