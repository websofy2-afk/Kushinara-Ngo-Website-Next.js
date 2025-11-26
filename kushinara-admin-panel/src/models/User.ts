import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    otp: String,
    isVerified: { type: Boolean, default: false },
    phone: String,
    bio: String,
    country: String,
    city: String,
    postalCode: String,
    profileImage: String,
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);

