import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthRequest, TokenPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'hkjsdgffg%$6';

export const generateToken = (payload: TokenPayload, options?: jwt.SignOptions): string | null => {
    try {
        const token = jwt.sign(payload, JWT_SECRET, options);
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        return null;
    }   
};


export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = {
            id:decoded.userId,
            role : decoded.role
        }
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return
    }
};