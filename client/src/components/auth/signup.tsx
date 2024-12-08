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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true); // Enable loader
    try {
      const response = await axios.post("/api/sign-up", data);
      router.push("/login");
    } catch (error) {
      console.log("Error during register. Please try again.");
    } finally {
      setIsSubmitting(false); // Disable loader after response
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white px-4 md:px-8 lg:px-32">
      <div className="w-full md:w-1/2 xl:w-2/5 p-8 rounded-3xl bg-white border-2 border-black">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black mb-6 text-text">
            Join To Stremline Analytics
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-start justify-center mt-16"
        >
          <div className="font-black text-text w-full">
            <label>Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-2 w-full px-4 py-2 text-text font-black border border-gray-400 rounded-2xl"
            />
          </div>

          <div className="font-black text-black w-full">
            <label>Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-2 w-full px-4 py-2 text-text font-black border border-gray-400 rounded-2xl"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2 px-4 bg-gray-100 text-gray-700 hover:bg-black hover:text-white font-bold rounded-2xl flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Please Wait
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="text-center mt-8">
          <p className="text-text">
            Already a member?{" "}
            <Link
              href="/login"
              className="text-blue-500 font-black hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
