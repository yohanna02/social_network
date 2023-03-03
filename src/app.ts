import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import prisma from "./db";
import userApi from "./api/user";
import AppError from "./interface/AppError";

dotenv.config();

// prisma.$connect().then(() => {
//     console.log("Connect to db successfully");
// }).catch((err) => {
//     console.error("Error connecting to DB");
//     console.log(err);
// });

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/v1", userApi);

const errorLogger = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "development")
        console.log(`error ${error.message}`);
    next(error);
};

const errorResponder = (error: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({ success: false, message });
}

const invalidPathHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ success: false, message: "Invalid Path" });
};

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(port, () => {
    console.log(`👉 Server 🏃 running on port ${port}`);
});