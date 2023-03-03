import express from "express";
import dotenv from "dotenv";

import userApi from "./api/user";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/v1", userApi);

app.listen(port, () => {
    console.log(`👉 Server 🏃 running on port ${port}`);
});