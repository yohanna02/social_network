import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import AppError from "../interface/AppError";
import { bodyI, loginSchema, registerSchema, RegisterType } from "../interface/userInterface";
import userModel, { UserModel } from "../models/userModel";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const body = req.body as RegisterType;

        const validate = registerSchema.safeParse(body);
        if (!validate.success) {
            throw new AppError(422, validate.error.message);
        }

        const userExist = await userModel.findOne({ email: body.email });
        if (userExist) {
            throw new AppError(422, "Email address already registered");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const newUser = new userModel({
            email: body.email,
            password: hashedPassword,
            fullName: body.fullName
        });
        await newUser.save();
        res.json({
            success: true,
            message: "User registered successfully"
        });
    } catch (err) {
        next(err);
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const body = req.body as bodyI;
        const validate = loginSchema.safeParse(body);
        if (!validate.success) {
            throw new AppError(422, "Invalid Params");
        }

        const user = await userModel.findOne({ email: body.email });
        if (!user) {
            throw new AppError(401, "Email address or Password is not correct");
        }

        const passwordMatch = await bcrypt.compare(body.password, user.password);
        if (!passwordMatch) {
            throw new AppError(401, "Email address or Password is not correct");
        }

        const JWT_SECRET = process.env.JWT_SECRET as string;
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "60 days" });

        res.json({
            token,
            user: {
                email: user.email,
                fullName: user.fullName
            }
        });
    } catch (err) {
        next(err);
    }
}

export const fetchUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user as UserModel | undefined;
        if (!user) {
            throw new AppError(401, "Not Authorized");
        }

        res.json({
            user: {
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (err) {
        next(err);
    }
}