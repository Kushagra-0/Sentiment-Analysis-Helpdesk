// models/Otp.ts
import mongoose, { Schema } from "mongoose";

interface Otp {
  email: string;
  otp: string;
  createdAt: Date;
}

const OtpSchema: Schema<Otp> = new mongoose.Schema<Otp>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires after 5 mins
});

const OtpModel =
  (mongoose.models.Otp as mongoose.Model<Otp>) ||
  mongoose.model<Otp>("Otp", OtpSchema);

export default OtpModel;
