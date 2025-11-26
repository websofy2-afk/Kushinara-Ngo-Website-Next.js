import { Donation } from "@/types/Donation";
import mongoose, { Schema, Document } from "mongoose";

const DonationSchema = new Schema<Donation>({
  name: { type: String, required: true},
  phoneNumber: { type: String, required: true},
  email: { type: String},
  address: { type: String, required: true},
  refrenceNumber: { type: String, required: true},
  amount: { type: Number, required: true },
  transactionId:{type:String, required:true, unique:true},
  isRecurring: { type: Boolean },
});

export default mongoose.models.Donation || mongoose.model<Donation>("Donation", DonationSchema);
