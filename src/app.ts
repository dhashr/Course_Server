import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import PatientRouter from "./Routes/PatientRoutes"
import UserRouter from "./Routes/UserRoutes";
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT: string | number | any= process.env.PORT;
const MONGO_URI: string | any = process.env.MONGODB_URI;
 
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", UserRouter);
app.use("/api", PatientRouter);

// connectDB();

mongoose.connect(MONGO_URI!)
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error);
    })

app.get('/', (req: Request, res: Response): void => {
    res.status(200).send('Server is running');
});

// app.listen(PORT, (): void => {
//     console.log(`Server is running on PORT: ${PORT}`);
// });