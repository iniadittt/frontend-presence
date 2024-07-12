import { z } from "zod";

export const SignInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must contain at least 8 character(s)"),
});
