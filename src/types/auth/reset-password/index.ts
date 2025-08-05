import { z } from "zod";

// Zod schema for validation
export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters"),
});

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;