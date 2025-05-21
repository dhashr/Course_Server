import express, {Express, Request, Response, NextFunction} from "express";

const app: Express = express();

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(500).json({msg: "Internal error something went wrong"})
})