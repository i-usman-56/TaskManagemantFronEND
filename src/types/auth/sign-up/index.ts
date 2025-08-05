import { z } from "zod";

// Zod schema for validation
export   const registerSchema = z.object({
    // fullName: z.string().min(1, "Full name is required"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    repeatpassword: z.string().min(8, "Password must be at least 8 characters"),
  });

export type RegisterSchemaFormValues = z.infer<typeof registerSchema>;