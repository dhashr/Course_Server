import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { connectDB } from './config/db';
import PatientRouter from "./Routes/PatientRoutes"
import UserRouter from "./Routes/UserRoutes";
import HRRoutes from './Routes/HRRoutes'
import dotenv from "dotenv";
import { apiLimiter } from './middleware/rateLimit';

dotenv.config();
const app: Express = express();
const PORT: string | number | any= process.env.PORT;
const MONGO_URI: string | any = process.env.MONGODB_URI;

app.use(cors());
app.use(helmet());
app.use(apiLimiter)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static(path.join(__dirname,'Routes','uploads')));
app.use("/api", UserRouter);
app.use("/api", PatientRouter);
app.use('/api',HRRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
}).catch((error) => {
    console.log(`Server is not running ${error}`);
})

// mongoose.connect(MONGO_URI!)
//     .then(() => {
//         console.log('MongoDB connected successfully');
//         app.listen(PORT, () => {
//             console.log(`Server is running on PORT: ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.error('MongoDB connection failed:', error);
//     })

app.get('/', (req: Request, res: Response): void => {
    res.status(200).send('Server is running');
});
