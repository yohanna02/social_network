import { Router } from "express";
import { fetchUser, loginUser, registerUser } from "../controller/userController";
import isAuth from "../middlewares/isAuth";

const router = Router();

router.get("/", isAuth, fetchUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;