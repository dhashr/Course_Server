
import mongoose, { Schema } from "mongoose";
import { IPatient } from "../types/patient";

const PatientSchema = new Schema<IPatient>({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: {
        type: String,
        enum: ["Male", "Female","Other"],
        required: true
    },
    contactNumber: { type: Number, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    isDelete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
})

const patient = mongoose.model<IPatient>('patient', PatientSchema);
export { patient, IPatient };