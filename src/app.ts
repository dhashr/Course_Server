import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { connectDB } from './config/db';
import PatientRouter from "./Routes/PatientRoutes"
import UserRouter from "./Routes/UserRoutes";
import HRRoutes from './Routes/HRRoutes'

const app: Express = express();
const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static(path.join(__dirname,'Routes','uploads')));
app.use("/api", UserRouter);
app.use("/api", PatientRouter);
app.use('/api',HRRoutes);

connectDB();

app.get('/', (_req: Request, res: Response): void => {
    res.status(200).send('Server is running');  
});

app.listen(PORT, (): void => {
    console.log(`Server is running on PORT: ${PORT}`);
});