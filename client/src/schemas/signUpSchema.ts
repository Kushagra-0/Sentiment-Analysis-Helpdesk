import * as z from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be 20 characters or less")
      .regex(/^[a-zA-Z0-9@#_]+$/, "Username can only contain letters, numbers, @, #, and _")
      .regex(/[a-z]/, "Username must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Username must contain at least one uppercase letter")
      .regex(/[@#_]/, "Username must contain at least one symbol like @, #, or _")
      .regex(/^\S*$/, "Username cannot contain spaces")
      .refine((val) => !/^\d+$/.test(val), {
        message: "Username cannot be only numbers",
      }),

    email: z.string().trim().email("Enter a valid email"),

    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter") // At least one lowercase letter
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
      .regex(/[0-9]/, "Password must contain at least one number") // At least one number
      .regex(/[\W_]/, "Password must contain at least one special character (e.g., @, #, $, _)") // At least one special character
      .regex(/^\S*$/, "Password cannot contain spaces"), // No spaces allowed
    
      confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
