import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db';
import PatientRouter from "./Routes/PatientRoutes"
import UserRouter from "./Routes/UserRoutes";

const app: Express = express();
const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", UserRouter);
app.use("/api", PatientRouter);

connectDB();

app.get('/', (_req: Request, res: Response): void => {
    res.status(200).send('Server is running');
});

app.listen(PORT, (): void => {
    console.log(`Server is running on PORT: ${PORT}`);
});