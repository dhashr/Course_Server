import { Request, Response, NextFunction } from "express";
import {UserRole } from '../types';

export const checkRole = (allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = (req.user)?.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            res.status(403).json({ message: "Access denied. Insufficient permissions." });
            return;
        }
        next();
    };
};