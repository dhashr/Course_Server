import { Request, Response, NextFunction } from "express";

const allowedOrigins = [
"http://localhost:3000",
"https://hoppscotch.io",
"http://localhost:5173",
"http://localhost:5173/"
];

export const validateOrigin = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.includes(origin)) {
    res.status(403).json({ message: "Ivalid origin" });
    return;
  }
  next();
};