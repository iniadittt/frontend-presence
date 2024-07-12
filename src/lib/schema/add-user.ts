import { z } from 'zod'

const indonesianPhoneRegex = /^(?:\+62|62|0)8[1-9][0-9]{6,11}$/;

export const addUserSchema = z.object({
    email: z.string().email().min(8).max(100),
    name: z.string().min(6).max(100),
    password: z.string().min(8),
    phone: z.string().min(10).max(20).regex(indonesianPhoneRegex, {
        message: "Phone number must be a valid Indonesian number"
    }),
    role: z.enum(['admin', 'user']),
})
