import { z } from "zod"

export const registerSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    countryCode: z.string().min(1, "Country code is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    repeatpassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.repeatpassword, {
    message: "Passwords don't match",
    path: ["repeatpassword"],
  })

export type RegisterSchemaFormValues = z.infer<typeof registerSchema>
