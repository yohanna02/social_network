import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userApi from "./api/user";
import AppError from "./interface/AppError";

dotenv.config();

const DB_CONNECTION_STRING = process.env.DATABASE_URL as string;
mongoose.connect(DB_CONNECTION_STRING)
.then(() => {
    console.log("👉 Connected to DB successfully");
})
.catch((err) => {
    console.error("Error connecting to database");
    console.error(err);
});

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const setCache = (req: Request, res: Response, next: NextFunction) => {
    const peroid = 60 * 5;
    if (req.method === "GET") {
        res.set("Cache-control", `public, max-age=${peroid}`);
    }
    else {
        res.set("Cache-control", "no-store");
    }

    next();
}

app.use(setCache);

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