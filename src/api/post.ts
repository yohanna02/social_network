import { Router } from "express";

import { createPost } from "../controller/postController";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.post("/", isAuth, createPost);

export default router;