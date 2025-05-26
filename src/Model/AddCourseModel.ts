import mongoose, { Schema } from "mongoose";
import { course } from "../types/course";

const CourseSchema = new Schema<course>({
    coursepdf :{type:String},
    title :{type:String,required:true},
    description :{type:String,required:true},
    recurring :{type:String,required:true},
    isActive :{type:Boolean,default:false},
    cratedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Course = mongoose.model<course>('assignCourse', CourseSchema);
export { Course, course };