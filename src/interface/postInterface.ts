import { z } from "zod";

export const createNewPostSchema = z.object({
    text: z.string()
});

export type CreatePostI = z.infer<typeof createNewPostSchema>;