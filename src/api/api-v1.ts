import { Router } from "express";

import userApi from "./user";
import postApi from "./post";

const router = Router();

router.use("/user", userApi);
router.use("/posts", postApi);

export default router;