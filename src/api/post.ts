import { Router } from "express";

import { createPost, fetchPost, fetchPosts } from "../controller/postController";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.post("/", isAuth, createPost);
router.get("/", isAuth, fetchPosts);
router.get("/:id", isAuth, fetchPost);

export default router;