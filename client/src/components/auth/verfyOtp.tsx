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

export default function VerifyOTP() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
    } = useForm<FormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post("/api/sign-up", data);
            console.log(response);
            router.push("/verifyOtp");
        } catch (error) {
            console.log("Error during register. Please try again.", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-blue-600 px-4 md:px-8 lg:px-32">
            <div className="w-full md:w-1/2 xl:w-2/5 p-8 rounded-3xl bg-white border-2 border-black shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-black mb-6">
                        Verify OTP
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 items-start justify-center mt-16"
                >
                    <div className="w-full font-black text-black">
                        <label htmlFor="username">Enter your OTP <span className="text-red-500">*</span> </label>
                        <input
                            required
                            id="username"
                            type="text"
                            {...register("username")}
                            className={`mt-2 w-full px-4 py-2 border rounded-2xl border-gray-400`}
                        />

                    </div>

                    {/* <div className="font-black text-black w-full">
                        <label>Email<span className="text-red-500"> *</span></label>
                        <input
                            type="email"
                            {...register("email")}
                            className="mt-2 w-full px-4 py-2 text-black font-black border border-gray-400 rounded-2xl"
                        />
                    </div>

                    <div className="font-black text-black w-full">
                        <label>Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            {...register("password")}
                            className="mt-2 w-full px-4 py-2 text-black font-black border border-gray-400 rounded-2xl"
                        />
                    </div>

                    <div className="w-full font-black text-black">
                        <label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span> </label>
                        <input
                            required
                            id="confirmPassword"
                            type="password"
                            {...register("confirmPassword")}
                            className={`mt-2 w-full px-4 py-2 border rounded-2xl border-gray-400`}
                        />
                    </div> */}

                    <button
                        type="submit"
                        className="w-full mt-2 py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 font-bold rounded-2xl flex items-center justify-center"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin mr-2" />
                                Please Wait
                            </>
                        ) : (
                            "Verify"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
