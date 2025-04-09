"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/signInSchema";
import { ToastContainer, toast } from "react-toastify";
import { Loader2 } from "lucide-react"; // Import the loader icon
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react"; // Import useState

type FormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage loading

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true); // Set loading state to true
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      console.log("Error during login. Please try again.");
    } else if (result?.url) {
      router.replace("/");
    }
    setIsSubmitting(false); // Reset loading state
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-blue-600 px-4 md:px-8 lg:px-32">
      <ToastContainer />
      <div className="w-full md:w-1/2 xl:w-2/5 p-8 rounded-3xl bg-white border-2 border-black shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-black mb-6">
            Welcome Back
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-start justify-center mt-16"
        >
          <div className="font-black text-black w-full">
            <label>Email</label>
            <input
              type="text"
              {...register("identifier")}
              className="mt-2 w-full px-4 py-2 text-black font-black border border-gray-400 rounded-2xl"
            />
          </div>

          <div className="font-black text-black w-full">
            <label>Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-2 w-full px-4 py-2 text-black font-black border border-gray-400 rounded-2xl"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 font-bold rounded-2xl flex items-center justify-center"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Please Wait
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="text-center mt-8">
          <p className="text-black">
            Not a member yet?{" "}
            <Link
              href="/register"
              className="text-blue-500 font-black hover:text-blue-700"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
