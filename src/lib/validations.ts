import { z } from "zod"
import { Role } from "@prisma/client"

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  role: z.nativeEnum(Role),
})

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  published: z.boolean().default(false),
})

export const updateUserRoleSchema = z.object({
  userId: z.string(),
  role: z.nativeEnum(Role),
})
