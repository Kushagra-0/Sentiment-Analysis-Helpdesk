"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";

type FormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      // Send the data to the backend to trigger OTP generation
      const response = await axios.post("/api/sign-up", data);
      router.push(`/verifyOtp`);
    } catch (error: any) {
      console.error("Error during register:", error);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 px-2">
      <div className="w-full max-w-lg p-6 mb-16 rounded-3xl bg-white border-2 border-black shadow-lg overflow-y-auto max-h-[95vh]">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-black text-black mb-6">Join To Streamline Analysis</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-start justify-center mt-6">
          <div className="w-full font-black text-black">
            <label htmlFor="username">Username <span className="text-red-500">*</span> </label>
            <input
              required
              id="username"
              type="text"
              {...register("username")}
              className={`mt-2 w-full px-4 py-2 border rounded-2xl ${errors.username ? "border-red-500" : "border-gray-400"}`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          <div className="w-full font-black text-black">
            <label htmlFor="email">Email <span className="text-red-500">*</span> </label>
            <input
              required
              id="email"
              type="email"
              {...register("email")}
              className={`mt-2 w-full px-4 py-2 border rounded-2xl ${errors.email ? "border-red-500" : "border-gray-400"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="w-full font-black text-black">
            <label htmlFor="password">Password <span className="text-red-500">*</span> </label>
            <input
              required
              id="password"
              type="password"
              {...register("password")}
              className={`mt-2 w-full px-4 py-2 border rounded-2xl ${errors.password ? "border-red-500" : "border-gray-400"}`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="w-full font-black text-black">
            <label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span> </label>
            <input
              required
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={`mt-2 w-full px-4 py-2 border rounded-2xl ${errors.confirmPassword ? "border-red-500" : "border-gray-400"}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 font-bold rounded-2xl flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Please Wait Sending OTP...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-black">Already have an account?{" "}
            <Link href="/login" className="text-blue-500 font-black hover:text-blue-700">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
