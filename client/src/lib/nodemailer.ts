// lib/nodemailer.ts
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail", // or use SMTP config
  auth: {
    user: process.env.EMAIL_USER,  // your Gmail
    pass: process.env.EMAIL_PASS,  // your Gmail App password
  },
});

export const sendOtpEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: `"Streamline Analytics" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `<h1>Verify your email</h1><p>Your OTP code is: <b>${otp}</b></p>`,
  });
};
