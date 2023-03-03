import { Request, Response, Router } from "express";
import prisma from "../db";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: req.body.password
        }
    });

    res.json(user);
});

export default router;