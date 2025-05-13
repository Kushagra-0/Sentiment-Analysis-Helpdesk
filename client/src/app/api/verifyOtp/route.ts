// app/api/verify-otp/route.ts
import { NextResponse } from "next/server";
import UserModel from "@/model/User";
import OtpModel from "@/model/OTP";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, otp, password, username } = await req.json();

    const validOtp = await OtpModel.findOne({ email, otp });
    if (!validOtp) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    // OTP matched - create user
    await UserModel.create({ email, password, username });

    // Remove OTP after successful verification
    await OtpModel.deleteOne({ email });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
