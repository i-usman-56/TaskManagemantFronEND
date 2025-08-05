import { z } from "zod";

// Define Zod schema for validation
export const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type ForgotPasswordForm = z.infer<typeof ForgotPasswordSchema>;