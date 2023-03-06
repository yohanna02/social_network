import { Router } from "express";

import { createPost, fetchPosts } from "../controller/postController";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.post("/", isAuth, createPost);
router.get("/", isAuth, fetchPosts);

export default router;