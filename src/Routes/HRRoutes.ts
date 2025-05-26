import express from "express";
const router = express.Router();

import multer from 'multer';
import path from 'path';    
import fs from 'fs';
  
import { addCousrse,getAllcourse,editCourese} from "../Controller/HRController";

import { addCourseValidation } from "../middleware/validation";

import { checkRole } from '../middleware/roleCheck';


import { UserRole } from '../types/index';


// Create upload directory if not exists
const uploadPath = path.join(__dirname, '/uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("req",req,file,"file")
    cb(null, uploadPath); // Destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null,file.originalname);
  }
});
 
const upload = multer({ storage });

//addcourse 
router.post('/addCousrse',upload.single('file'),addCousrse);

router.post('/getCourse',getAllcourse);

router.post('/editCourese',upload.single('file'),editCourese);





export default router;