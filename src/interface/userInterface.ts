import { z } from "zod";

export interface UserI extends RegisterType {
    // _id?
}

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    fullName: z.string()
});
export type RegisterType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
});
export type bodyI = z.infer<typeof loginSchema>;