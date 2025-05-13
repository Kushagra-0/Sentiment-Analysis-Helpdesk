import dbConnect from "@/lib/dbConnect";
import OtpModel from "@/model/OTP";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "@/lib/nodemailer";
import { User } from "lucide-react";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username ,email, password, role } = await request.json();

    const existingUserByEmail = await UserModel.findOne({ email });

    const existingUserByUserName = await UserModel.findOne({ username });

    if (existingUserByEmail || existingUserByUserName) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit

    await OtpModel.create({ email, otp });

    await sendOtpEmail(email, otp);

    return Response.json(
      {
        success: true,
        message: "User registered successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
