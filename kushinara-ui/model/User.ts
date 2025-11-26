import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email : string; 
  mobile: string;
  dob : string; 
  gender : string;
}

const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  dob: { type: String, required: true },
  gender: { type: String, required : true},

});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
