import { Request, Response, NextFunction } from "express";

import AppError from "../interface/AppError";
import { createNewPostSchema, CreatePostI } from "../interface/postInterface";
import postModel from "../models/postModel";
import { UserModel } from "../models/userModel";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user as UserModel;
        const body = req.body as CreatePostI;
        const validate = createNewPostSchema.safeParse(body);
        if (!validate.success) {
            throw new AppError(400, "Invalid Params");
        }

        const newPost = new postModel({
            text: body.text,
            author: user._id
        });
        await newPost.save();

        const post = await postModel.findById(newPost.id)
            .populate("author", "fullName email")
            .select("text")
            .select("author")
            .select("comments")
            .select("createdAt");
        res.json(post);

    } catch (err) {
        next(err);
    }
}

export const fetchPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await postModel.find()
            .populate("author", "fullName email")
            .select("text")
            .select("author")
            .select("comments")
            .select("createdAt")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (err) {
        next(err);
    }
}

export const fetchPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = req.params.id;
        const post = await postModel.findById(postId)
            .populate("author", "fullName email")
            .select("text")
            .select("author")
            .select("comments")
            .select("createdAt");

        if (!post) {
            throw new AppError(404, "Post not found");
        }

        res.json(post);
    } catch (err) {
        next(err);
    }
}