import { Request } from 'express';
import { Types, Model, Document } from 'mongoose';

//enum for UserRole
export enum UserRole {
    Admin = "Admin",
    Receptionist = "Receptionist",
    Pathologist = "Pathologist",
    Technician = "Technician",
    LabManager = 'LabManager',
    HR = 'HR'
}

//interface for User based on Role
export interface IUser extends Request {
    email: string;
    username: string;
    password: string;
    role: UserRole,
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}


//declare global user in req for use to get by req in all the api.
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                role: UserRole
            }
        }
    }
}


//interface for AuthRequest
export interface AuthRequest extends Request {
    userId?: string;
    userRole?: string
}


//interface for Tokenpayload
export interface TokenPayload {
    userId: string;
    role?: string
}

//interface for paginations
export interface searchPagination {
    page?: number;
    limit?: number;
    searchFields?: string[];
    searchKeyword?: string;
    filter?: Record<string, any>;
    model: Model<any>
}


//interface for aggregate paginations 
// type MongoProject = Record<string, 0 | 1 | string | { [key: string]: any }>;
export interface CrossDbPaginateOptions {
    model: Model<any>;
    fromCollection: string;
    localField: string;
    foreignField: string;
    as: string;
    match?: Record<string, any>;
    project?: Record<string, 1 | string>;    
    page?: number;
    limit?: number;
    sort?: Record<string, 1 | -1>;
    flatten?:Boolean
}

//interface for LoginHistory
export interface ILoginHistory extends Document {
    userId: Types.ObjectId;
    role: string;
    origin: string;
    ip: string;
    location?: string;
    userAgent: string;
    cretedAt: Date;
}