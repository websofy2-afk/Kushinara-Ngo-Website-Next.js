import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  isVerified: { type: Boolean, default: false },
});

export default models.User || model("User", UserSchema);