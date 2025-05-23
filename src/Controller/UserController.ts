import { Request, Response } from 'express';
import { User } from '../Model/UserModel';
import { LoginHistory } from "../Model/LoginHistoryModel";
import { IUser, ILoginHistory, IEmailData } from '../types';
import { encryptPassword, comparePassword } from '../helper/encryptDecrypt';
import { generateToken } from '../middleware/authendicate';
import { sendUserEmail } from '../helper/sendGridMail';

// add user
export const addUser = async (req: Request, res: Response) => {
    try {
        let { type } = req.query;
        let { email, username, password, role, userId } = req.body;

        if (type === 'add') {
            if (!email || !username || !password || !role) {
                res.status(400).json({ status: false, message: "Missing required fields (email, username, password, role)." });
                return;
            }

            let existingUser = await User.findOne({ email }).lean(); // Using findOne and lean for efficiency
            if (existingUser) {
                res.json({ status: true, message: "User Already Exists" });
                return
            } else {
                let hashPassword = await encryptPassword(password);

                let newObj: IUser = new User({
                    email: email,
                    username: username,
                    password: hashPassword,
                    role: role
                });
                let mailData: IEmailData = {
                    email: email, 
                    username: username, 
                    password: password, 
                }
                let saveUser = await User.create(newObj);
                if (saveUser) {
                    sendUserEmail(mailData);
                    res.status(201).json({ status: true, message: "Successfully Added User" });
                } else {
                    res.status(500).json({ status: false, message: "User Not Added Successfully" });
                }
            }
        } else if (type === 'get') {
            const filterRole = req.query.role as string;
            let query: any = {};

            if (filterRole) {
                query.role = filterRole;
                console.log(`Workspacing users with role: ${filterRole}`);
            } else {
                console.log("Fetching all users.");
            }

            const users = await User.find(query).lean(); // Use .lean() for plain JS objects

            if (users) {
                res.status(200).json({ status: true, data: users, count: users.length });
            } else {
                res.status(404).json({ status: false, message: "No users found matching the criteria." });
            }

        } else {
            res.status(400).json({ status: false, message: 'Invalid or missing "type" query parameter.' });
        }

    } catch (error: any) {
        console.error("UserCrud Catch Error:", error);
        res.status(500).json({ status: false, message: "An internal server error occurred.", error: error.message });
    }
};

//user login
export const LoginUser = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body;
        const ip = req.headers["x-forwarded-for"] || '';
        const origin = req.headers.origin || "unknown";
        const userAgent = req.headers["user-agent"] || "unknown";
        let UserFind = await User.find({ email }, { role: 1, password: 1 });
        if (UserFind.length) {
            let comparepassword = UserFind[0].password;
            const isPasswordMatch = await comparePassword(password, comparepassword);
            if (!isPasswordMatch) {
                res.json({ status: false, message: "Invalid password" });
                res.end();
                return;
            } else {
                let userId = (UserFind[0]._id).toString();
                let role = UserFind[0].role
                const payload = {
                    userId: userId.toString(),
                    role: role,
                };
                let createToken = await generateToken(payload, { expiresIn: '10h' });
                let location = '';
                let LoginHistoryObj: ILoginHistory = new LoginHistory({
                    userId,
                    role,
                    origin,
                    ip,
                    userAgent,
                    location,
                });
                let LogHissaveData = await LoginHistory.insertOne(LoginHistoryObj);
                res.json({ status: true, message: "Login successful", Token: createToken, role: role, id: userId });
                res.end();
                return;
            }
        } else {
            res.json({ status: false, message: "Invalid email" });
            res.end();
            return;
        }
    } catch (error) {
        console.log(error)
        res.json({ status: false, message: "User Login Catch Error", error: error });
        res.end();
        return;
    }
}

