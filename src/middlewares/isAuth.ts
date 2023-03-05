import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import AppError from "../interface/AppError";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const JWT_SECRET = process.env.JWT_SECRET as string;

        if (token) {
            const decodedToken: any = jwt.verify(token, JWT_SECRET);

            if (decodedToken) {
                const user = await userModel.findById(decodedToken.id);
                if (user) {
                    res.locals.user = user;
                    next();
                    return;
                }
            }
        }
        throw new AppError(401, "Not Authorized");
    } catch(err) {
        next(err);
    }
}