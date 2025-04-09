import { User } from "@/interface/User";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema<User> = new mongoose.Schema<User>({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["user", "member", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {timestamps: true});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
