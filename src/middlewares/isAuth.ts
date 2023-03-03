import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../db";
import AppError from "../interface/AppError";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const JWT_SECRET = process.env.JWT_SECRET as string;

        if (token) {
            const decodedToken: any = jwt.verify(token, JWT_SECRET);

            if (decodedToken) {
                const user = await prisma.user.findUnique({ where: { id: decodedToken.id } });
                if (user) {
                    req.user = user;
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